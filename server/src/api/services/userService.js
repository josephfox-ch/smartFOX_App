import User from "../models/user.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  const salt = await bcrypt.genSalt(10);
  const hashedPassword = await bcrypt.hash(userData.password, salt);
  const user = await User.create({ ...userData, password: hashedPassword });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const updateUser = async (id, userData) => {
  const user = await User.update(userData, {
    where: {
      id: id,
    },
  });
  return user;
};

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: {
      id: id,
    },
  });
  return user;
};

export { createUser, getAllUsers, updateUser, deleteUser };
