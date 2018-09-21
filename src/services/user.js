import { authHeader } from '../helpers/authHeader';
import axios from 'axios';

export const userService = {
  login,
  logout
};

// login is a post to /api/auth/login
// requiring username and password
function login(username, password) {
  const body = { username, password };
  return axios
    .post('http://localhost:3001/api/auth/login', body);
}

function logout() {
  localStorage.removeItem('user');
}