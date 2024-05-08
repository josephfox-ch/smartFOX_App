import * as UserService from "../services/userService.js";

const UserController = {
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
