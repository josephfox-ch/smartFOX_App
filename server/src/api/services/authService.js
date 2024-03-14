import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/index.js";
import sendSMS from "../../notifications/smsService.js";
import { generateOTP,saveOTPForUser,checkOTPForUser } from "../../utils/utils.js";

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
    const isValid = await checkOTPForUser(userId, otpInput);
    if (!isValid) throw new Error("Invalid or expired OTP");

    const user = await User.findByPk(userId);
    const payload = { userId: user.id, email: user.email };
    const token = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "1w",
    });

    return { token, user: { id: user.id, email: user.email } };
  },
  async login(email, password) {
    const user = await User.findOne({ where: { email } });
    if (!user) throw new Error("User not found.");

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) throw new Error("Invalid Password.");

    const otp = generateOTP();
    sendSMS(user.phoneNumber, `Your OTP: ${otp}`);
    await saveOTPForUser(user.id, otp);

    return { user: { id: user.id, email: user.email, otpRequired: true } };
  },
};

export default authService;
