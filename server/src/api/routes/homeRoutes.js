import express from "express";
import * as HomeController from "../controllers/homeController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, HomeController.getHomes);

router.post("/", authenticateUser, HomeController.createHome);

router.put("/", authenticateUser, HomeController.updateHome);

router.delete("/", authenticateUser, HomeController.deleteHome);

export default router;