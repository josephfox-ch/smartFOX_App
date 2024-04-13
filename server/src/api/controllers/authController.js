import AuthService from "../services/authService.js";
import { setCookie } from "../../utils/utils.js";
import { User } from "../models/index.js";
import RefreshTokenService from "../services/refreshTokenService.js";

const AuthController = {
  async register(req, res) {
    try {
      const { user, otp } = await AuthService.register(req.body);
      res.status(201).json({
        success: true,
        message: "Registration started. OTP sent.",
        userId: user.id, 
        otpSent: !!otp 
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
      const result = await AuthService.verifyRegistration(userId, otp);
  
      if (!result.success) {
        return res.status(400).json({
          success: false,
          message: result.message 
        });
      }
  
      const { user, accessToken, refreshToken } = result;
  
      req.session.user = { id: user.id, username: user.username };
  
      setCookie(res, "smartFOXAccessToken", accessToken, { maxAge: 15 * 60 * 1000 });
      const refreshCookieMaxAge = 7 * 24 * 60 * 60 * 1000;  
      setCookie(res, "smartFOXRefreshToken", refreshToken, { maxAge: refreshCookieMaxAge });
  
      res.status(200).json({
        success: true,
        message: "Registration Successful. User verified.",
        user,
      });
    } catch (error) {
      console.error('Controller error:', error);
      res.status(500).json({
        success: false,
        message: "OTP Verification failed",
        error: error.message || error.toString()
      });
    }
  }
  
,

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
      res.status(401).json({
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
      const userId = await RefreshTokenService.validateRefreshToken(
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
  async resendOTP(req, res) {
    try {
      const { userId } = req.body; 
      await AuthService.resendOTP(userId);
  
      res.status(200).json({
        success: true,
        message: "A new Authentication Code has been sent to your email."
      });
    } catch (error) {
      console.error("Resend OTP Error: ", error);
      res.status(500).json({
        success: false,
        message: "Failed to resend OTP",
        error: error.message
      });
    }
  }
  ,
   
   async logout(req, res) {
    try {
      const { cookies, session } = req;
      const result = await AuthService.logout(cookies, session);
      
      result.clearCookies.forEach(cookie => {
        res.clearCookie(cookie.name, { path: cookie.path });
      });
      res.status(200).json({ message: result.message });
    } catch (error) {
      console.error("Logout Error:", error);
      res.status(500).json({ message: "Failed to logout, internal server error." });
    }
  },

  async forgotPassword(req, res) {
    try {
      const { email } = req.body;
      await AuthService.forgotPassword(email);
      res.status(200).json({
        success: true,
        message: "An email has been sent to reset your password.",
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "Failed to reset password",
        error: error.message,
      });
    }
  }
};

export default AuthController;

//todo: defining maxAge is best practise when cleaning up.
// res.cookie('smartFOXAccessToken', '', { maxAge: 0, httpOnly: true, secure: true, sameSite: 'Strict', path: '/' });
// res.cookie('smartFOXRefreshToken', '', { maxAge: 0, httpOnly: true, secure: true, sameSite: 'Strict', path: '/' });
// res.clearCookie('smartFOX-session', { path: '/' });