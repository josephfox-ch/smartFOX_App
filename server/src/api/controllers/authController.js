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

    logger.info(`Attempting to register user: ${email}`);

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

    logger.info(`Registration successful for user: ${email}`);

    res.status(201).json({
      success: true,
      message:
        "Registration successful. Please check your email for the one-time-password.",
      userId: user.id,
      otpSent: !!otp,
    });
  } catch (error) {
    logger.error(`Registration failed for ${email}: ${error.message}`);
    res.status(400).json({
      success: false,
      message: "Registration failed",
      error: error.message,
    });
  }
};

const verifyRegistration = async (req, res) => {
  const { userId, otp } = req.body;

  logger.info(`Verifying registration for user ID ${userId}`);

  try {
    const { success, user, token, message } =
      await AuthService.verifyRegistration(userId, otp);

    if (!success) {
      return res.status(400).json({ success: false, message });
    }

    logger.info(`User verified successfully: ${user.email}`);

    req.session.token = token;

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
  const { email } = req.body;

  logger.info(`Sending OTP to ${email}`);

  try {
    await AuthService.sendOTP(email);
    const user = await User.findOne({ where: { email } });
    res.status(200).json({
      success: true,
      message: "Authentication code has been sent to your email.",
      userId: user.id,
    });
  } catch (error) {
    logger.error(`Failed to send OTP to ${email}: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to send OTP",
      error: error.message,
    });
  }
};

const resendOTP = async (req, res) => {
  const { userId } = req.body;

  logger.info(`Resending OTP to user ID ${userId}`);

  try {
    await AuthService.resendOTP(userId);
    res.status(200).json({
      success: true,
      message: "A new authentication code has been sent to your email.",
    });
  } catch (error) {
    logger.error(
      `Failed to resend OTP for user ID ${userId}: ${error.message}`
    );
    res.status(500).json({
      success: false,
      message: "Failed to resend OTP",
      error: error.message,
    });
  }
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  logger.info(`Processing forgot password for ${email}`);

  try {
    await AuthService.forgotPassword(email);
    res.status(200).json({
      success: true,
      message:
        "An email has been sent to reset your password. Please check your inbox.",
    });
  } catch (error) {
    logger.error(
      `Failed to process forgot password for ${email}: ${error.message}`
    );
    res.status(500).json({
      success: false,
      message: "Failed to process forgot password",
      error: error.message,
    });
  }
};

const resetPassword = async (req, res) => {
  const { token, password } = req.body;

  logger.info(`Resetting password for token: ${token}`);

  try {
    await AuthService.resetPassword(token, password);
    res.status(200).json({
      success: true,
      message: "Your password has been reset successfully.",
    });
  } catch (error) {
    logger.error(`Failed to reset password: ${error.message}`);
    res.status(500).json({
      success: false,
      message: "Failed to reset password. Please try again later.",
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  logger.info(`Attempting login for ${email}`);

  try {
    const { success, user, token } = await AuthService.login({
      email,
      password,
    });

    if (!success) {
      logger.warn(`Invalid credentials for ${email}`);
      return res
        .status(401)
        .json({ success: false, message: "Invalid credentials." });
    }

    req.session.token = token;

    logger.info(`Login successful for ${email}`);

    res.status(200).json({
      success: true,
      message: "Login successful. User authenticated.",
      user,
    });
  } catch (error) {
    logger.error(`Login failed for ${email}: ${error.message}`);
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

const validateAuthentication = async (req, res) => {
  const token = req.session.token;
  try {
    const user = await AuthService.validateAuthentication(token);
    res.status(200).json({
      success: true,
      message: "User authenticated successfully.",
      user,
    });
  } catch (error) {
    logger.error(`Failed to validate authentication: ${error.message}`);
    res.status(401).json({
      success: false,
      message:
        "For your security, Your session has expired. Please log in again.",
      error: error.message,
    });
  }
};

const logout = async (req, res) => {
  try {
    await AuthService.logout(req);
    logger.info("User logged out successfully.");
    res.status(200).json({
      success: true,
      message: "You have been successfully logged out.",
    });
  } catch (error) {
    logger.error("Failed to logout: " + error.message);
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
  validateAuthentication,
  logout,
};
