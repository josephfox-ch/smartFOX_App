import * as UserService from "../services/userService.js";

const UserController = {
  createUser: async (req, res) => {
    try {
      const user = await UserService.createUser(req.body);
      return res.status(201).json({
        message: "User created successfully",
        user,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user",
        error: error.message,
      });
    }
  },

  getAllUsers: async (req, res) => {
    try {
      const users = await UserService.getAllUsers();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching users",
        error: error.message,
      });
    }
  },
  getUserById: async (req, res) => {
    const { id } = req.params;
    try {
      const user = await UserService.getUserById(id);
      if (user) {
        return res.status(200).json(user);
      } else {
        return res.status(404).json({ message: "User not found" });
      }
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching user",
        error: error.message,
      });
    }
  },
  updateUser: async (req, res) => {
    const { id } = req.params;
    try {
      const updatedUser = await UserService.updateUser(id, req.body);
      return res.status(200).json({
        message: "User updated successfully",
        data: updatedUser,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating user",
        error: error.message,
      });
    }
  },
  deleteUser: async (req, res) => {
    const { id } = req.params;
    try {
      const result = await UserService.deleteUser(id);
      if (!result.success) {
        return res.status(404).json({ message: result.message });
      }
      return res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      return res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  },
};

export default UserController;
