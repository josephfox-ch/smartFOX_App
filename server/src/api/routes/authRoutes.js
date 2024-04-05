import express from "express";
import AuthController from "../controllers/authController.js";

const router = express.Router();

router.post("/register", AuthController.register);

router.post("/register/verify-2fa", AuthController.verifyRegistration);

router.post("/login",AuthController.login);

router.post("/login/verify-2fa", AuthController.verifyLogin);

export default router;
