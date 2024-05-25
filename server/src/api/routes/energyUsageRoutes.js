import express from "express";
import * as EnergyController from "../controllers/energyUsageController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.post("/", authenticateUser, EnergyController.createEnergyUsage);

router.get("/:id", authenticateUser, EnergyController.getEnergyUsageById);

router.get("/home/:homeId", authenticateUser, EnergyController.getEnergyUsageByHomeId);

export default router;

