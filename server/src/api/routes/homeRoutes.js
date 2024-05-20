import express from "express";
import * as HomeController from "../controllers/homeController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, HomeController.getHomes);

router.get("/:id", authenticateUser, HomeController.getHomeDetails);

router.post("/", authenticateUser, HomeController.createHomeWithEnergyCertificate);

router.put("/:id", authenticateUser, HomeController.updateHomeWithEnergyCertificate);

router.delete("/", authenticateUser, HomeController.deleteHome);

export default router;