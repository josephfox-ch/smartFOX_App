import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Op } from "sequelize";
import { User, Home, UserPreferences, OTP } from "../models/index.js";
import { generateTokens } from "../../utils/jwtHelpers.js";
import RefreshTokenService from "./refreshTokenService.js";
import sendSMS from "../../notifications/smsService.js";
import {
  sendOTPMail,
  sendResetPasswordLinkMail,
} from "../../notifications/mailService.js";
import {
  generateOTP,
  saveOTPForUser,
  checkOTPForUser,
} from "../../utils/utils.js";
import sequelize from "../../../database/config.js";

const AuthService = {
  async register(userData) {
    console.log("userdata", userData);
    const transaction = await sequelize.transaction();
    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);

      const user = await User.create(
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          phoneNumber: userData.phoneNumber,
          password: hashedPassword,
        },
        { transaction }
      );

      const preferences = await UserPreferences.create(
        {
          userId: user.id,
          acceptTerms: userData.acceptTerms,
          securityQuestion: userData.securityQuestion,
          securityAnswer: userData.securityAnswer,
          acceptEmails: userData.acceptEmails,
        },
        { transaction }
      );

      const otp = generateOTP();
      // await sendSMS(userData.phoneNumber, `Your OTP: ${otp}`); //todo: send
      await sendOTPMail(userData.email, otp);
      await saveOTPForUser(user.id, otp, transaction);

      await transaction.commit();

      return { user, preferences, otp };
    } catch (error) {
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
      console.log("Service error:", error.message);
      return { success: false, message: error.message };
    }
  },
  async resendOTP(userId) {
    await OTP.destroy({
      where: {
        userId,
      },
    });

    const newOTP = generateOTP();

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

    let userData = user.get({ plain: true });
    delete userData.password;

    console.log("withoutpassword", userData);
    return {
      user: userData,
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
        throw new Error("Incorrect email address.");
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
