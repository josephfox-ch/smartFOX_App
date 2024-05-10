import sequelize from "../../config/db.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";
import logger from "../../config/logger.js";

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] },
    });
    if (!user) {
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error(`Error retrieving user by ID ${userId}: ${error}`);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  const user = await User.findByPk(userId)
  if (!user) {
    throw new Error("User not found");
  }
  if (userData.password) {
    userData.password = await bcrypt.hash(userData.password, 12);
  }
  try {
    const updatedUser = await user.update(userData);
  
    return updatedUser;
  } catch (error) {
    logger.error(`Error updating user ID ${userId}: ${error}`);
    throw error;
  }
};

const deleteUser = async (id) => {
  return sequelize
    .transaction(async (transaction) => {
      const deleted = await User.destroy({ where: { id }, transaction });
      if (!deleted) {
        return { success: false, message: "User not found" };
      }
      return { success: true, id };
    })
    .catch((error) => {
      logger.error(`Error deleting user ID ${id}: ${error}`);
      throw error;
    });
};

export { getUserById, updateUser, deleteUser };
