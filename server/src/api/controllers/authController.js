import * as AuthService from "../services/authService.js";
import { User } from "../models/index.js";
import logger from "../../config/logger.js";

const register = async (req, res) => {
  try {
    const {
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      acceptTerms,
      acceptEmails,
      acceptCookies,
    } = req.body;
    const { user, otp } = await AuthService.register({
      firstName,
      lastName,
      email,
      phoneNumber,
      password,
      acceptTerms,
      acceptEmails,
      acceptCookies,
    });
    res.status(201).json({
      success: true,
      message: "Registration successful. Please check your email for the OTP.",
      userId: user.id,
      otpSent: !!otp,
    });
  } catch (error) {
    logger.error(`Registration failed for ${req.body.email}: ${error.message}`);
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const verifyRegistration = async (req, res) => {
  const { userId, otp } = req.body;
  try {
    const { success, user, token, message } =
      await AuthService.verifyRegistration(userId, otp);

    if (!success) {
      return res.status(400).json({ success: false, message });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 30 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({
      success: true,
      message: "Registration successful. User verified.",
      user,
    });
  } catch (error) {
    logger.error(
      `OTP Verification failed for user ID ${userId}: ${error.message}`
    );
    res.status(500).json({
      success: false,
      message: "OTP Verification failed",
      error: error.message,
    });
  }
};

const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;
    await AuthService.sendOTP(email);
    const user = await User.findOne({ where: { email } });
    res.status(200).json({
      success: true,
      message: "Authentication code has been sent to your email.",
      userId: user.id,
    });
  } catch (error) {
    console.error("Send OTP Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

const resendOTP = async (req, res) => {
  try {
    const { userId } = req.body;
    await AuthService.resendOTP(userId);

    res.status(200).json({
      success: true,
      message: "A new authentication code has been sent to your email.",
    });
  } catch (error) {
    console.error("Resend OTP Error: ", error);
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    await AuthService.forgotPassword(email);
    res.status(200).json({
      success: true,
      message:
        "An email has been sent to reset your password. Please check your inbox.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token, password } = req.body;
    await AuthService.resetPassword(token, password);
    res.status(200).json({
      success: true,
      message: "Your password has been reset successfully.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to reset password. Please try again later.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const { success, user, token } = await AuthService.login({
      email,
      password,
    });

    if (!success) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    res.cookie("token", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      maxAge: 6 * 30 * 24 * 60 * 60 * 1000, // 6 ay
    });

    res.status(200).json({
      success: true,
      message: "Login successful. User authenticated.",
      user: user,
    });
  } catch (error) {
    logger.error(`Login failed for ${email}: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Login failed",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await AuthService.logout(req);
    res.status(200).json({
      success: true,
      message: "You have been successfully logged out.",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to logout",
      error: error.message,
    });
  }
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
