import express from "express";
import { uploadAvatar, removeAvatar } from "../controllers/s3Controller.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/upload-avatar", authenticateUser, uploadAvatar);
router.delete("/delete-avatar", authenticateUser, removeAvatar);

export default router;
