import express from "express";
import passport from "../../config/passport.js";
import UserController from "../controllers/userController.js";

const router = express.Router();

router.post(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.createUser
);

router.get(
  "/",
  passport.authenticate("jwt", { session: false }),
  UserController.getAllUsers
);

router.get(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.getUserById
);

router.put(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.updateUser
);

router.delete(
  "/:id",
  passport.authenticate("jwt", { session: false }),
  UserController.deleteUser
);

export default router;
