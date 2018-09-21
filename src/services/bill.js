import axios from 'axios';
import { store } from '../store';

export const billService = {
  createBill,
  getBills,
  deleteBill,
  updateBill
}

function createBill(body) {
  const { username, token } = store.getters['authentication/getUser'];
  const config = {
    headers: {
      "x-access-token": token
    }
  }
  return axios
    .post(`http://localhost:3001/api/users/${username}/bills`,
      body,
      config
    );
}

function getBills() {
  const { username, token } = store.getters['authentication/getUser'];
  const config = {
    headers: {
      "x-access-token": token
    }
  }
  return axios
    .get(`http://localhost:3001/api/users/${username}/bills`, config);
}

function deleteBill(id) {
  const { username, token } = store.getters['authentication/getUser'];
  const config = {
    headers: {
      "x-access-token": token
    }
  }
  return axios
    .delete(`http://localhost:3001/api/users/${username}/bills/${id}`, config);
}

function updateBill(id, body) {
  const { username, token } = store.getters['authentication/getUser'];
  const config = {
    headers: {
      "x-access-token": token
    }
  }
  body.username = username;
  return axios
  .put(`http://localhost:3001/api/users/${username}/bills/${id}`,
    body,
    config
  );
}