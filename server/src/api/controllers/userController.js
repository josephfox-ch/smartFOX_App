import * as UserService from "../services/userService.js";
import logger from "../../config/logger.js";

const UserController = {
  getUser: async (req, res) => {
    try {
      const user = await UserService.getUserById(req.user.id);
      res.json({
        success: true,
        user,
      });
    } catch (error) {
      logger.error(`Failed to fetch user: ${error.message}`);
      res.status(400).json({
        success: false,
        message: "Error fetching user",
        error: error.message,
      });
    }
  },

  updateUser: async (req, res) => {
    const  id  = req.user.id;
    try {
      const updatedUser = await UserService.updateUser(id, req.body);
      res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      logger.error(`Failed to update user ID ${id}: ${error.message}`);
      res.status(500).json({
        message: "Error updating user",
        error: error.message,
      });
    }
  },

  deleteUser: async (req, res) => {
    const  id  = req.user.id;
    try {
      const result = await UserService.deleteUser(id);
      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      logger.error(`Failed to delete user ID ${id}: ${error.message}`);
      res.status(500).json({
        message: "Error deleting user",
        error: error.message,
      });
    }
  },
};

export default UserController;
