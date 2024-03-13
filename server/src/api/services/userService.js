import sequelize from "../../../database/config.js";
import { User, UserDetails, Home } from "../models/index.js";
import bcrypt from "bcryptjs";

const createUserWithDetails = async (userData, userDetailsData) => {
  return sequelize.transaction(async (transaction) => {
    const hashedPassword = await bcrypt.hash(userData.password, 12);
    const user = await User.create(
      { ...userData, password: hashedPassword },
      { transaction }
    );

    const userDetails = await UserDetails.create(
      { ...userDetailsData, userId: user.id },
      { transaction }
    );

    return { user, userDetails };
  });
};

const getAllUsersWithDetails = async () => {
  return User.findAll({
    include: [
      {
        model: UserDetails,
        as: "userDetails",
      },
      {
        model: Home,
        as: "homes",
      },
    ],
  });
};

const getUserWithDetailsById = async (userId) => {
  try {
    const user = await User.findByPk(userId, {
      include: [
        {
          model: UserDetails,
          as: 'userDetails',
        },
        {
          model: Home,
          as: 'homes',
        },
      ],
    });

    if (!user) {
      return { success: false, message: "User not found" };
    }

    return { success: true, user };
  } catch (error) {
    return { success: false, error };
  }
};


const updateUserWithDetails = async (userId, userData, userDetailsData) => {
  return sequelize.transaction(async (transaction) => {
    if (userData.password) {
      userData.password = await bcrypt.hash(userData.password, 12);
    }
    const userUpdateResult = await User.update(userData, {
      where: { id: userId },
      transaction,
    });
    const userDetailsUpdateResult = await UserDetails.update(userDetailsData, {
      where: { userId: userId },
      transaction,
    });

    return { user: userUpdateResult, userDetails: userDetailsUpdateResult };
  });
};

const deleteUser = async (id) => {
  return sequelize.transaction(async (transaction) => {
    const deleted = await User.destroy({ where: { id }, transaction });
    if (deleted) return { success: true, id };
    else return { success: false, message: "User not found" };
  });
};

export {
  createUserWithDetails,
  getAllUsersWithDetails,
  getUserWithDetailsById,
  updateUserWithDetails,
  deleteUser,
};
