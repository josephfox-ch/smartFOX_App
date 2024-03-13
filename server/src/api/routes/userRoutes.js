import express from "express";
import passport from '../../config/passport.js'
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post("/",passport.authenticate('jwt',{session:false}), UserController.createUserWithDetails);

router.get("/",passport.authenticate('jwt',{session:false}), UserController.getAllUsersWithDetails); 

router.get('/:userId/details',passport.authenticate('jwt',{session:false}), UserController.getUserWithDetailsById);

router.put('/:id',passport.authenticate('jwt',{session:false}),UserController.updateUserWithDetails);

router.delete('/:id',passport.authenticate('jwt',{session:false}), UserController.deleteUser);







export default router;
