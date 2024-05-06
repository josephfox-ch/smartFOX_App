import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { User, Home, UserPreferences, OTP } from "../models/index.js";
import { generateTokens } from "../../utils/jwtHelpers.js";
import RefreshTokenService from "./refreshTokenService.js";
import {
  sendOTPMail,
  sendResetPasswordLinkMail,
} from "../../notifications/mailService.js";
import {
  generateOTP,
  saveOTPForUser,
  checkOTPForUser,
} from "../../utils/utils.js";
import sequelize from "../../config/db.js";
import logger from "../../config/logger.js";

const AuthService = {
  async register({
    firstName,
    lastName,
    email,
    phoneNumber,
    password,
    acceptTerms,
    acceptEmails,
    acceptCookies,
  }) {
    logger.info(`Registering user... in service ${email}`);

    const transaction = await sequelize.transaction();

    try {
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
      logger.info(`User is created ${email}`);

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
      // await sendSMS(phoneNumber, `Your OTP: ${otp}`); //todo: send
      await sendOTPMail(email, otp);
      logger.info(`User is registered and OTP Code  send to ${email}`);
      await saveOTPForUser(user.id, otp, transaction);

      await transaction.commit();

      return { user, otp };
    } catch (error) {
      logger.error(`Error creating user ${email}: ${error.message}`, {
        stack: error.stack,
      });
      await transaction.rollback();
      throw error;
    }
  },
  async verifyRegistration(userId, otpInput) {
    try {
      await checkOTPForUser(userId, otpInput);

      await User.update({ isVerified: true }, { where: { id: userId } });

      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error("User Not Found.");
      }
      logger.info("User Verified: " + user.email);
      const { accessToken, refreshToken } = generateTokens(user);

      let userWithoutPassword = user.get({ plain: true });
      delete userWithoutPassword.password;

      return {
        success: true,
        user: userWithoutPassword,
        accessToken: accessToken,
        refreshToken: refreshToken,
      };
    } catch (error) {
      logger.error("Service error:", error.message);
      return { success: false, message: error.message };
    }
  },
  async sendOTP(email) {
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
  },
  async resendOTP(userId) {
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
  },
  async login(email, pwd) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Incorrect authentication credentials.");
    if (!user.isVerified) throw new Error("User is not yet verified.");
    if (!(await bcrypt.compare(pwd, user.password)))
      throw new Error("Incorrect authentication credentials.");

    const { accessToken, refreshToken } = generateTokens(user);
    await RefreshTokenService.saveRefreshToken(user.id, refreshToken);

    let userWithoutPassword = user.get({ plain: true });
    delete userWithoutPassword.password;

    console.log("withoutpassword", userWithoutPassword.password);
    return {
      user: userWithoutPassword,
      accessToken,
      refreshToken,
    };
  },
  async logout(cookies, session) {
    const refreshToken = cookies["smartFOXRefreshToken"];

    if (!refreshToken) {
      throw new Error("No refresh token provided");
    }

    await RefreshTokenService.removeRefreshToken(refreshToken);

    return new Promise((resolve, reject) => {
      session.destroy((err) => {
        if (err) {
          reject({ message: "Failed to destroy session" });
        } else {
          resolve({
            message: "Logout successful, Tokens and Session cleared.",
            clearCookies: [
              { name: "smartFOXAccessToken", path: "/" },
              { name: "smartFOXRefreshToken", path: "/" },
              { name: "smartFOX-session", path: "/" },
            ],
          });
        }
      });
    });
  },

  forgotPassword: async (email) => {
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
  },

  resetPassword: async (token, password) => {
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
  },
};

export default AuthService;
