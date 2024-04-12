import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:3000/api/v1',
  withCredentials: true,
  credentials:'include',  
  headers: {
    'Content-Type': 'application/json',
  },
});

export default API;

