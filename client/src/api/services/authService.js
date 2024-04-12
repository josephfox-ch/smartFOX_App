import API from '../index';

const authService = {
  login: async ({ email, password, rememberMe }) => {
    const response = await API.post('/auth/login', { email, password, rememberMe });
    console.log("Login response:", response.data);
    return response.data;
  },

  logout: async () => {
    const response = await API.post('/auth/logout');
    console.log("Logout response:", response.data);
    return response.data; 
  },

  register: async (email, password, additionalData) => {
    const response = await API.post('/auth/register', { email, password, ...additionalData });
    console.log("Register response:", response.data);
    return response.data; 
  },
};

export default authService;

