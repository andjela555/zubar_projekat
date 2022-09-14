import axios from "axios";
import { UserRes } from "../types";


export async function loginUser(user: any) {
  const res = await axios.post('/auth/login', user);
  const userRes = res.data as UserRes;
  axios.defaults.headers.common.authorization = 'Bearer ' + userRes.token;
  localStorage.setItem('token', userRes.token);
  return userRes.user;
}

export async function registerUser(user: any) {
  const res = await axios.post('/auth/register', user);
  const userRes = res.data as UserRes;
  axios.defaults.headers.common.authorization = 'Bearer ' + userRes.token;
  localStorage.setItem('token', userRes.token);
  return userRes.user;
}

export async function checkUser() {
  const token = localStorage.getItem('token');
  if (!token) {
    return null;
  }
  axios.defaults.headers.common.authorization = 'Bearer ' + token;
  const res = await axios.get('/check');
  return res.data;
}