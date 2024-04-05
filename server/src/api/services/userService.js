import sequelize from "../../../database/config.js";
import { User} from "../models/index.js";
import bcrypt from "bcryptjs";

const createUser = async (userData) => {
  const hashedPassword = await bcrypt.hash(userData.password, 12);
  try {
    const user = await User.create({
      ...userData,
      password: hashedPassword,
    });
    return user;
  } catch (error) {
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const users = await User.findAll();
    return users;
  } catch (error) {
    throw error;
  }
};

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId);
    return user;
  } catch (error) {
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }
  try {
    const [updateCount] = await User.update(userData, {
      where: { id: userId },
    });
    if (updateCount > 0) {
      const updatedUser = await User.findByPk(userId);
      return updatedUser;
    } else {
      throw new Error("User not found");
    }
  } catch (error) {
    throw error;
  }
};

const deleteUser = async (id) => {
  return sequelize.transaction(async (transaction) => {
    const deleted = await User.destroy({ where: { id }, transaction });
    if (deleted) return { success: true, id };
    else return { success: false, message: "User not found" };
  });
};

export { createUser, getAllUsers, getUserById, updateUser, deleteUser };
