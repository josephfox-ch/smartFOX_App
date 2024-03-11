import User from "../models/user.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  const user = await User.create({ ...userData, password: hashedPassword });
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const updateUser = async (id, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }
  const [updated] = await User.update(userData, {
    where: { id },
  });
  if (updated) {
    const updatedUser = await User.findByPk(id);
    return updatedUser;
  }

  throw new Error("User not found");
};

const deleteUser = async (id) => {
  const user = await User.destroy({
    where: { id },
  });
  return user;
};

export { createUser, getAllUsers, updateUser, deleteUser };
