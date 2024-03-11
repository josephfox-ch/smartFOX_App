import User from "../models/user.js";

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

export { createUser, getAllUsers };

