import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import {Op} from 'sequelize';
import { User, Home, UserPreferences,OTP } from "../models/index.js";
import { generateTokens } from "../../utils/jwtHelpers.js";
import RefreshTokenService from "./refreshTokenService.js";
import sendSMS from "../../notifications/smsService.js";
import sendOTPMail from "../../notifications/mailService.js";
import {
  generateOTP,
  saveOTPForUser,
  checkOTPForUser,
} from "../../utils/utils.js";
import sequelize from "../../../database/config.js";

const AuthService = {
  async register(userData) {
    const transaction = await sequelize.transaction();

    try {
      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create(
        {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          username: userData.username,
          phoneNumber: userData.phoneNumber,
          password: hashedPassword,
        },
        { transaction }
      );

      const home = await Home.create(
        {
          userId: user.id,
          name: userData.houseName,
          address: userData.streetAddress,
          postalCode: userData.postalCode,
          city: userData.city,
          country: userData.country,
          timeZone: userData.timeZone,
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
      // await sendSMS(userData.phoneNumber, `Your OTP: ${otp}`); //todo: SMS service
      await sendOTPMail(userData.email, otp);
      await saveOTPForUser(user.id, otp, transaction);
      await transaction.commit();

      return { user, home, preferences, otp };
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
  
      return {
        success: true,
        user: { id: user.id, email: user.email, isVerified: user.isVerified },
        accessToken: accessToken,
        refreshToken: refreshToken
      };
    } catch (error) {
      console.log('Service error:', error.message);
      return { success: false, message: error.message }; 
    }
  }
  ,

async resendOTP(userId) {
  
  await OTP.destroy({
    where: {
      userId
    }
  });

  const newOTP = generateOTP();

  const user = await User.findByPk(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  await saveOTPForUser(userId, newOTP);

  await sendOTPMail(user.email, newOTP);

}
,

  async login(email, password, rememberMe) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("Incorrect email or password.");
    if (!user.isVerified)
      throw new Error(
        "User is not yet verified."
      );
    if (!(await bcrypt.compare(password, user.password)))
      throw new Error("Incorrect email or password.");

    const { accessToken, refreshToken } = generateTokens(user, rememberMe);
    await RefreshTokenService.saveRefreshToken(
      user.id,
      refreshToken,
      rememberMe
    );

    return {
      user: { id: user.id, email: user.email },
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
              { name: "smartFOXAccessToken",  path: "/"  },
              { name: "smartFOXRefreshToken",  path: "/"  },
              { name: "smartFOX-session",  path: "/"  },
            ],
          });
        }
      });
    });
  },

 


};

export default AuthService;
