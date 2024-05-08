import express from "express";
import UserController from "../controllers/userController.js";
import { authenticateUser } from "../middlewares/authMiddleware.js";

const router = express.Router();

router.get("/", authenticateUser, UserController.getUser);

router.put("/", authenticateUser, UserController.updateUser);

router.delete("/", authenticateUser, UserController.deleteUser);

export default router;
