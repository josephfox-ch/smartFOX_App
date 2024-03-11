import * as userService from "../services/userService.js";

const UserController = {
  createUser: async (req, res) => {
    try {
      const newUser = await userService.createUser(req.body);
      res.json(newUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  getAllUsers: async (req, res) => {
    try {
      const users = await userService.getAllUsers();
      res.json(users);
    } catch (error) {
      res.status(500).json(error);
    }
  },
  updateUser: async (req, res) => {
    try {
      const updatedUser = await userService.updateUser(req.body);
      res.json(updatedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  },

  deleteUser: async (req, res) => {
    try {
      const deletedUser = await userService.deleteUser(req.params.id);
      res.json(deletedUser);
    } catch (error) {
      res.status(500).json(error);
    }
  }
};

export default UserController;

