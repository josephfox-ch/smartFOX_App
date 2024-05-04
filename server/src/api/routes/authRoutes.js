import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/verify-otp", AuthController.verifyRegistration);

router.post('/resend-otp',AuthController.resendOTP)

router.post('/send-otp',AuthController.sendOTP)

router.post("/verify-account", AuthController.verifyAccount);

router.post("/login",AuthController.login);

router.post("/login/verify-otp", AuthController.verifyLogin); //todo: 2FA authentication

router.post('/refresh-token', AuthController.refreshToken); //todo: implement later

router.post('/forgot-password', AuthController.forgotPassword);

router.post('/reset-password', AuthController.resetPassword);

router.post('/logout', AuthController.logout);

export default router;


// router.post('/revoke-token', async (req, res) => {
//   const { refreshToken } = req.body;
//   try {
//       await refreshTokenService.removeRefreshToken(refreshToken);
//       res.status(200).json({ message: "Token revoked successfully." });
//   } catch (error) {
//       res.status(500).json({ message: "Failed to revoke token." });
//   }
// });