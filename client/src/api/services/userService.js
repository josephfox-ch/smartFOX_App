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


