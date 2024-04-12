import AuthService from "../services/authService.js";
import { setCookie } from "../../utils/utils.js";
import { User } from "../models/index.js";

const authController = {
  async register(req, res) {
    try {
      const { user, home, preferences, otp } = await AuthService.register(
        req.body
      );
      res.status(201).json({
        success: true,
        message: "Registration started. OTP sent.",
        user: user,
        home: home,
        preferences: preferences,
        otp: otp,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Registration failed",
        error: error.message,
      });
    }
  },

  async verifyRegistration(req, res) {
    try {
      const { userId, otp } = req.body;
      const { token, user } = await AuthService.verifyOTP(userId, otp);
      res.status(200).json({
        success: true,
        message: "Registration Successful. User verified.",
        token: token,
        user: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "OTP Verification failed",
        error: error.message,
      });
    }
  },

  async login(req, res) {
    try {
      const { email, password, rememberMe } = req.body;
      const { user, accessToken, refreshToken } = await AuthService.login(
        email,
        password,
        rememberMe
      );

      req.session.user = { id: user.id, username: user.username };

      setCookie(res, "smartFOXAccessToken", accessToken, {
        maxAge: 15 * 60 * 1000,
      });

      const refreshCookieMaxAge = rememberMe
        ? 30 * 24 * 60 * 60 * 1000
        : 7 * 24 * 60 * 60 * 1000;
      setCookie(res, "smartFOXRefreshToken", refreshToken, {
        maxAge: refreshCookieMaxAge,
      });

      res.status(200).json({
        success: true,
        message: "Login Successful.",
        user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "Login failed",
        error: error.message,
      });
    }
  },

  async verifyLogin(req, res) {
    try {
      const { userId, otp } = req.body;
      const { token, user } = await AuthService.verifyOTP(userId, otp);
      res.status(200).json({
        success: true,
        message: "Login Successful. User verified.",
        token: token,
        user: user,
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: "OTP Verification failed",
        error: error.message,
      });
    }
  },
  async refreshToken(req, res) {
    const { refreshToken } = req.body;
    if (!refreshToken) {
      return res.status(400).json({ message: "Refresh token is required" });
    }

    try {
      const userId = await refreshTokenService.validateRefreshToken(
        refreshToken
      );
      if (!userId) {
        return res.status(401).json({ message: "Invalid refresh token" });
      }
      const user = User.findById(userId);
      const { accessToken, newRefreshToken } = jwtHelpers.generateTokens(
        user,
        true
      );

      res.json({
        accessToken,
        refreshToken: newRefreshToken,
      });
    } catch (error) {
      res.status(401).json({ message: error.message });
    }
  },

  async logout(req, res) {
    const { refreshToken } = req.body;
    try {
      await refreshTokenService.removeRefreshToken(refreshToken);
      res.status(200).json({ message: "Logout successful, token removed." });
    } catch (error) {
      res.status(500).json({ message: "Failed to logout." });
    }
  },
};

export default authController;


