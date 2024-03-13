import * as UserService from "../services/userService.js";

const UserController = {
  createUserWithDetails: async (req, res) => {
    const { user, userDetails } = req.body;
    try {
      const result = await UserService.createUserWithDetails(user, userDetails);
      return res.status(201).json({
        message: "User and user details created successfully",
        user: result.user,
        userDetails: result.userDetails,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error creating user and user details",
        error: error.message,
      });
    }
  },

  getAllUsersWithDetails: async (req, res) => {
    try {
      const users = await UserService.getAllUsersWithDetails();
      return res.status(200).json(users);
    } catch (error) {
      return res.status(500).json({
        message: "Error fetching users with details",
        error: error.message,
      });
    }
  },
  getUserWithDetailsById: async (req, res) => {
    const { userId } = req.params;
    const { success, user, message, error } =
      await UserService.getUserWithDetailsById(userId);

    if (success) {
      return res.status(200).json(user);
    } else if (message) {
      return res.status(404).json({ message });
    } else {
      return res
        .status(500)
        .json({
          message: "Error fetching user with details",
          error: error.message,
        });
    }
  },

  updateUserWithDetails: async (req, res) => {
    const { userId } = req.params;
    const { user, userDetails } = req.body;
    try {
      const result = await UserService.updateUserWithDetails(
        userId,
        user,
        userDetails
      );
      return res.status(200).json({
        message: "User and user details updated successfully",
        data: result,
      });
    } catch (error) {
      return res.status(500).json({
        message: "Error updating user and user details",
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
