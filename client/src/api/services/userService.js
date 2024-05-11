import API from '../API';

export const updateUser = async (userData) => {
  try {
    const response = await API.put('/user', userData);
    console.log('response user',response.data);
    return response.data;
    
  } catch (error) {
    console.error('Error updating user:', error);
    throw error;
  }
};

export const deleteUser = async () => {
  try {
    const response = await API.delete('/user');
    return response.data;
  } catch (error) {
    console.error('Error deleting user:', error.response ? error.response.data : error.message);
    throw error;
  }
};


