import API from '../API'; 

const createAccessControl = async (data) => {
  try {
    const response = await API.post('/access-control', data);
    return response.data;
  } catch (error) {
    throw new Error(`AccessControl could not created: ${error.message}`);
  }
};

const getAccessControlsByUser = async (userId) => {
  try {
    const response = await API.get(`/access-control/user/${userId}`);
    return response.data;
  } catch (error) {
    throw new Error(`AccessControl could not fetched: ${error.message}`);
  }
};

export default { createAccessControl, getAccessControlsByUser };
