import User from "../models/user.js";

const createUser = async (userData) => {
  const user = await User.create(userData);
  return user;
};

const getAllUsers = async () => {
  const users = await User.findAll();
  return users;
};

const updateUser = async (id,userData) => {
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
