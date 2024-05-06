import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserPreferences, OTP } from "../models/index.js";
import { generateToken } from "../../helpers/jwtHelper.js";
import {
  sendOTPMail,
  sendResetPasswordLinkMail,
} from "../../notifications/mailService.js";
import {
  generateOTP,
  saveOTPForUser,
  checkOTPForUser,
} from "../../helpers/otpHelper.js";
import sequelize from "../../config/db.js";
import logger from "../../config/logger.js";

const register = async ({
  firstName,
  lastName,
  email,
  phoneNumber,
  password,
  acceptTerms,
  acceptEmails,
  acceptCookies,
}) => {
  logger.info(`Registering user in service: ${email}`);
  const transaction = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({ where: { email }, transaction });
    if (existingUser) {
      throw new Error("Email already exists");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    const user = await User.create(
      {
        firstName,
        lastName,
        email,
        phoneNumber,
        password: hashedPassword,
      },
      { transaction }
    );

    await UserPreferences.create(
      {
        userId: user.id,
        acceptTerms,
        acceptEmails,
        acceptCookies,
      },
      { transaction }
    );

    const otp = await generateOTP();
    await sendOTPMail(email, otp);
    await saveOTPForUser(user.id, otp, transaction);

    await transaction.commit();
    logger.info(`User registered and OTP sent: ${email}`);
    return { user, otp };
  } catch (error) {
    logger.error(`Error creating user ${email}: ${error.message}`, {
      stack: error.stack,
    });
    await transaction.rollback();
    throw error;
  }
};

const verifyRegistration = async (userId, otp) => {
  try {
    const isValidOTP = await checkOTPForUser(userId, otp);
    if (!isValidOTP) {
      throw new Error("Invalid or expired OTP.");
    }
    const user = await User.findByPk(userId);
    if (!user) {
      throw new Error("User not found.");
    }

    await User.update({ isVerified: true }, { where: { id: userId } });

    const token = generateToken(user);
    //todo: await saveSession(user.id, token);

    logger.info(`User verified: ${user.email}`);
    return {
      success: true,
      user: user,
      token: token,
    };
  } catch (error) {
    logger.error(`Verification failed for ${userId}: ${error.message}`);
    throw error;
  }
};

const sendOTP = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    throw new Error("Incorrect authentication credentials.");
  }
  const otp = await generateOTP();
  await saveOTPForUser(user.id, otp);
  return {
    success: true,
    message: "OTP sent to email address successfully.",
  };
};

const resendOTP = async (userId) => {
  await OTP.destroy({
    where: {
      userId,
    },
  });

  const newOTP = await generateOTP();

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  await saveOTPForUser(userId, newOTP);

  await sendOTPMail(user.email, newOTP);
};

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Incorrect authentication credentials.");
    }
    if (!user.isVerified) {
      throw new Error("User account is not yet verified.");
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: "1h",
    });
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${token}`;

    await sendResetPasswordLinkMail(user.email, resetLink);

    return {
      success: true,
      message: "Reset password link sent successfully.",
    };
  } catch (error) {
    throw error;
  }
};

const resetPassword = async (token, password) => {
  try {
    const { id } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findByPk(id);
    if (!user) {
      throw new Error("User not found.");
    }
    if (!user.isVerified) {
      throw new Error("User account is not yet verified.");
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    console.log("hashed password", hashedPassword);
    await user.update({ password: hashedPassword });
    return { success: true, message: "Password changed successfully." };
  } catch (error) {
    console.log(error);
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new Error("Incorrect authentication credentials.");
    }
    if (!user.isVerified) throw new Error("User is not yet verified.");

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      throw new Error("Incorrect authentication credentials.");
    }

    const token = generateToken(user);
    let userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;

    logger.info(`User logged in: ${user.email}`);
    return { success: true, user: userWithoutPassword, token };
  } catch (error) {
    logger.error(`Login error for user ${email}: ${error.message}`);
    throw new Error(error.message || "Login failed.");
  }
};

const logout = async (req) => {
  req.session = null;
  res.send("Logged out successfully.");
};

export {
  register,
  verifyRegistration,
  sendOTP,
  login,
  resendOTP,
  forgotPassword,
  resetPassword,
  logout,
};
