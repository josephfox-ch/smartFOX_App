import * as userService from "../services/userService.js";

const userController = {
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
};

export default userController;

