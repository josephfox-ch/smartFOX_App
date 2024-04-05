import axios from 'axios';

const axiosWithAuth = () => {
  const token = localStorage.getItem('token');
  return axios.create({
    baseURL: 'http://localhost:3000/api/v1',
    headers: {
      Authorization: token ? `Bearer ${token}` : '',
    },
  });
};

export default axiosWithAuth;
