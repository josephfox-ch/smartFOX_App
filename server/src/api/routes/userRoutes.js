import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/", UserController.createUser);

router.get("/", UserController.getAllUsers);

router.put('/',UserController.updateUser);

router.delete('/', UserController.deleteUser);





export default router;
