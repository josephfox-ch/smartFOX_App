import sequelize from "../../config/db.js";
import { User} from "../models/index.js";
import bcrypt from "bcryptjs";
import logger from "../../config/logger.js";

const getUserById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      attributes: { exclude: ["password"] }
    });
    if (!user) {
      logger.warn(`User not found: ID = ${userId}`);
      throw new Error("User not found");
    }
    return user;
  } catch (error) {
    logger.error(`Error retrieving user by ID ${userId}: ${error.message}`);
    throw error;
  }
};

const updateUser = async (userId, userData) => {
  try {
    const user = await User.findByPk(userId);
    if (!user) {
      logger.warn(`User not found: ID = ${userId}`);
      throw new Error("User not found");
    }
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12);
    }
    const updatedUser = await user.update(userData);
    return updatedUser;
  } catch (error) {
    logger.error(`Error updating user ID ${userId}: ${error.message}`);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    return await sequelize.transaction(async (transaction) => {
      const deleted = await User.destroy({ where: { id }, transaction });
      if (!deleted) {
        logger.warn(`User not found for deletion: ID = ${id}`);
        return { success: false, message: "User not found" };
      }
      return { success: true, id };
    });
  } catch (error) {
    logger.error(`Error deleting user ID ${id}: ${error.message}`);
    throw error;
  }
};

export { getUserById, updateUser, deleteUser };

