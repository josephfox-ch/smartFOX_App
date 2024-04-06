import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User, Home, UserPreferences } from "../models/index.js";
import sendSMS from "../../notifications/smsService.js";
import sendOTPMail from "../../notifications/mailService.js";
import {
  generateOTP,
  saveOTPForUser,
  checkOTPForUser,
} from "../../utils/utils.js";
import sequelize from "../../../database/config.js";

const authService = {
  async register(userData) {
    const transaction = await sequelize.transaction();

    try {
  

      const hashedPassword = await bcrypt.hash(userData.password, 12);
      const user = await User.create(
        {
          firstName:userData.firstName,
          lastName:userData.lastName,
          email:userData.email,
          username:userData.username,
          phoneNumber:userData.phoneNumber,
          password: hashedPassword,
        },
        { transaction }
      );

      const home = await Home.create(
        {
          userId: user.id,
          name: userData.houseName,
          address:userData.streetAddress,
          postalCode:userData.postalCode,
          city:userData.city,
          country:userData.country,
          timeZone:userData.timeZone,
        },
        { transaction }
      );

      const preferences = await UserPreferences.create(
        {
          userId: user.id,
          acceptTerms: userData.acceptTerms,
          securityQuestion: userData.securityQuestion,
          securityAnswer: userData.securityAnswer,
          acceptEmails: userData.acceptEmails
        },
        { transaction }
      );

      const otp = generateOTP();
      // await sendSMS(userData.phoneNumber, `Your OTP: ${otp}`); //todo: SMS service
      await sendOTPMail(userData.email, otp);
      await saveOTPForUser(user.id, otp, transaction);
      await transaction.commit();

      return { user, home, preferences };
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },
  async verifyOTP(userId, otpInput) {
    await checkOTPForUser(userId, otpInput);

    await User.update({ isVerified: true }, { where: { id: userId } });

    const user = await User.findByPk(userId);
    if (!user) throw new Error("User Not Found.");

    const payload = { userId: user.id, email: user.email };

    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    return {
      token,
      user: { id: user.id, email: user.email, isVerified: user.isVerified },
    };
  },

  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found.");

    if (!user.isVerified) {
      throw new Error(
        "User is not yet verified. Please complete the 2FA verification."
      );
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Password.");

    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    return { user: { id: user.id, email: user.email }, token };
  },
};

export default authService;
