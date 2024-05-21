import express from "express";
import { uploadAvatar, removeAvatar ,getWaterFlowTemperature} from "../controllers/s3Controller.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();


router.post("/upload-avatar", authenticateUser, uploadAvatar);
router.delete("/delete-avatar", authenticateUser, removeAvatar);
// router.put("/upload-avatar", authenticateUser, uploadAvatar);
router.get('/iot/home-thermostat/tw/:homeId', authenticateUser, getWaterFlowTemperature);

export default router;
