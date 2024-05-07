import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, UserPreferences, OTP } from "../models/index.js";
import {
  generateSessionToken,
  generateAccessToken,
  verifyToken,
} from "../../helpers/jwtHelper.js";
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
  logger.info(`Attempting to register user: ${email}`);
  const transaction = await sequelize.transaction();

  try {
    const existingUser = await User.findOne({ where: { email }, transaction });
    if (existingUser) {
      logger.error(`Registration failed: Email ${email} already exists`);
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
    logger.info(`User ${email} registered successfully and OTP sent`);
    return { user, otp };
  } catch (error) {
    logger.error(`Error registering user ${email}: ${error.message}`);
    await transaction.rollback();
    throw error;
  }
};

const verifyRegistration = async (userId, otp) => {
  try {
    await checkOTPForUser(userId, otp);

    const user = await User.findByPk(userId);
    if (!user) {
      logger.error(`Verification failed: User ID ${userId} not found`);
      throw new Error("User not found.");
    }

    await User.update({ isVerified: true }, { where: { id: userId } });

    const token = generateSessionToken(user);
    logger.info(`User ${user.email} verified successfully`);
    return {
      success: true,
      user: user,
      token: token,
    };
  } catch (error) {
    logger.error(`Verification failed for user ID ${userId}: ${error.message}`);
    throw error;
  }
};

const sendOTP = async (email) => {
  const user = await User.findOne({ where: { email } });
  if (!user) {
    logger.error(`Send OTP failed: Email ${email} not found`);
    throw new Error("User not found.");
  }
  const otp = await generateOTP();
  await saveOTPForUser(user.id, otp);
  await sendOTPMail(email, otp);
  logger.info(`OTP sent to ${email} successfully`);
  return {
    success: true,
    message: "OTP sent to email address successfully.",
  };
};

const resendOTP = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.error(`Resend OTP failed: User ${userId} not found`);
      throw new Error("User not found.");
    }

    await OTP.destroy({
      where: { userId },
    });

    const newOTP = await generateOTP();
    await saveOTPForUser(userId, newOTP);
    await sendOTPMail(user.email, newOTP);
    logger.info(`New OTP sent to ${user.email}`);
  } catch (error) {
    logger.error(`Resend OTP error for user ${userId}: ${error.message}`);
    throw error;
  }
};

const forgotPassword = async (email) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.error(
        `Forgot password failed: Email ${email} not associated with any user`
      );
      throw new Error("Incorrect authentication credentials.");
    }
    if (!user.isVerified) {
      logger.error(`Forgot password failed: User ${email} is not yet verified`);
      throw new Error("User account is not yet verified.");
    }

    const token = generateAccessToken(user);
    const resetLink = `${process.env.FRONTEND_URL}/auth/reset-password/${token}`;
    await sendResetPasswordLinkMail(user.email, resetLink);

    logger.info(`Reset password link sent to ${email}`);
    return {
      success: true,
      message: "Reset password link sent successfully.",
    };
  } catch (error) {
    logger.error(`Forgot password error for ${email}: ${error.message}`);
    throw error;
  }
};

const resetPassword = async (token, password) => {
  try {
    const decoded = verifyToken(token);
    const user = await User.findByPk(decoded.id);
    if (!user) {
      logger.error("Reset password failed: User not found.");
      throw new Error("User not found.");
    }
    if (!user.isVerified) {
      logger.error("Reset password failed: User account is not yet verified.");
      throw new Error("User account is not yet verified.");
    }

    const hashedPassword = await bcrypt.hash(password, 12);
    await user.update({ password: hashedPassword });

    logger.info(`Password reset successfully for user ${user.email}`);
    return {
      success: true,
      message: "Password changed successfully.",
    };
  } catch (error) {
    logger.error(`Reset password error: ${error.message}`);
    throw error;
  }
};

const login = async ({ email, password }) => {
  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      logger.error(`Login failed: Email ${email} not found`);
      throw new Error("Incorrect authentication credentials.");
    }
    if (!user.isVerified) {
      logger.error(`Login failed: User ${email} is not yet verified`);
      throw new Error("User is not yet verified.");
    }

    const isValidPassword = await bcrypt.compare(password, user.password);
    if (!isValidPassword) {
      logger.error(`Login failed: Invalid password for ${email}`);
      throw new Error("Incorrect authentication credentials.");
    }

    const token = generateSessionToken(user);
    let userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;

    logger.info(`User ${email} logged in successfully`);
    return { success: true, user: userWithoutPassword, token };
  } catch (error) {
    logger.error(`Login error for ${email}: ${error.message}`);
    throw error;
  }
};

const logout = async (req) => {
  req.session = null;
  logger.info("User logged out successfully");
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
