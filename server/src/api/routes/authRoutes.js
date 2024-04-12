import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/register/verify-otp", AuthController.verifyRegistration);

router.post("/login",AuthController.login);

router.post("/login/verify-otp", AuthController.verifyLogin);

router.post('/refresh-token', AuthController.refreshToken);

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