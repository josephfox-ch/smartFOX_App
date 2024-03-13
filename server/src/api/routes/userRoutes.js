import express from "express";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/", UserController.createUserWithDetails);

router.get("/", UserController.getAllUsersWithDetails); 

router.get('/:userId/details', UserController.getUserWithDetailsById);

router.put('/:id',UserController.updateUserWithDetails);

router.delete('/:id', UserController.deleteUser);





export default router;
