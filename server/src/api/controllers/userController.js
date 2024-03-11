import * as userService from "../services/userService.js";

const UserController = {
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res
        .status(201)
        .json({ message: "User created successfully", user: newUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error creating user", error: error.message });
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.status(200).json(users);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error fetching users", error: error.message });
    }
  },
  updateUser: async (req, res) => {
    try {
      const { id } = req.params;
      const updatedUser = await userService.updateUser(id, req.body);
      if (updatedUser[0] === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User updated successfully", user: updatedUser });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error updating user", error: error.message });
    }
  },
  deleteUser: async (req, res) => {
    try {
      const { id } = req.params;
      const deletedUser = await userService.deleteUser(id);
      if (deletedUser === 0) {
        return res.status(404).json({ message: "User not found" });
      }
      res.status(200).json({ message: "User deleted successfully" });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Error deleting user", error: error.message });
    }
  },
};

export default UserController;
