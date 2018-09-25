import { authHeader } from '../helpers/authHeader';
import axios from 'axios';

export const userService = {
  login,
  register,
  logout
};

// login is a post to /api/auth/login
// requiring username and password
function login(username, password) {
  const body = { username, password };
  return axios
    .post('http://localhost:3001/api/auth/login', body);
}

function register(username, password) {
  const body = { username, password };
  return axios
    .post('http://localhost:3001/api/auth/register', body);
}

function logout() {
  localStorage.removeItem('user');
}