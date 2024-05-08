import sequelize from "../../config/db.js";
import { User } from "../models/index.js";
import bcrypt from "bcryptjs";

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

export { updateUser, deleteUser };
