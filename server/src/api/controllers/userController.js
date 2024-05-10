import * as UserService from "../services/userService.js";
import logger from "../../config/logger.js";

const UserController = {
  getUser: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.user.id);
      res.status(200).json({
        success: true,
        user,
      });
      logger.info(`User fetched successfully: ID = ${req.user.id}`);
    } catch (error) {
      logger.error(`Failed to fetch user ID ${req.user.id}: ${error.message}`);
      res.status(400).json({
        success: false,
        message: "Error fetching user",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    const id = req.user.id;
    try {
      const updatedUser = await UserService.updateUser(id, req.body);
      res.status(200).json({
        success: true,
        message: "User updated successfully",
        user: updatedUser,
      });
      logger.info(`User updated successfully: ID = ${id}`);
    } catch (error) {
      logger.error(`Failed to update user ID ${id}: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Error updating user",
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    const id = req.user.id;
    try {
      const result = await UserService.deleteUser(id);
      if (!result.success) {
        res.status(404).json({
          success: false,
          message: result.message,
        });
        req.session = null;
        return;
      }
      res.status(200).json({
        success: true,
        message: "User deleted successfully",
      });
      logger.info(`User deleted successfully: ID = ${id}`);
    } catch (error) {
      logger.error(`Failed to delete user ID ${id}: ${error.message}`);
      res.status(500).json({
        success: false,
        message: "Error deleting user",
        error: error.message,
      });
    }
  },
};

export default UserController;

