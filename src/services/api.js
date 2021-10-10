import axios from 'axios';

const token = localStorage.getItem('token')

const api = axios.create({
  baseURL: process.env.REACT_APP_BACKEND,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    Authorization:  `Bearer ${token}`
  }
});


export default api;