import API from '../API';

export const updateUser = async (userData) => {
  try {
    const response = await API.put('/user', userData);
    return response.data;
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};
