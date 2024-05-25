import express from "express";
import * as HVACController from "../controllers/hvacSystemLogController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, HVACController.createHVACSystemLog);

router.get("/:id", authenticateUser, HVACController.getHVACSystemLogById);

router.get("/home/:homeId", authenticateUser, HVACController.getHVACSystemLogByHomeId);

export default router;