import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import sendSMS from "../../notifications/smsService.js";
import {
  generateOTP,
  saveOTPForUser,
  checkOTPForUser,
} from "../../utils/utils.js";

const authService = {
  async register(userData) {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await User.create({ ...userData, password: hashedPassword });

    const otp = generateOTP();

    sendSMS(user.phoneNumber, `Your OTP: ${otp}`);

    await saveOTPForUser(user.id, otp);

    return { id: user.id, email: user.email, otpSent: true };
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
      throw new Error("User is not yet verified. Please complete the 2FA verification.");
    }
  
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Password.");
  
    
    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: "1w" });
  
   
    return { user: { id: user.id, email: user.email }, token };
  },
};

export default authService;
