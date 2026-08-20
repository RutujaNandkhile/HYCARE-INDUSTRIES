import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/users`;

export const addUser = (user) =>
  axios.post(
    `${API_URL}/register`,
    user
  );

export const verifyRegisterOtp = (data) =>
  axios.post(
    `${API_URL}/verify-register-otp`,
    data
  );

export const loginUser = (
  email,
  password
) =>
  axios.post(
    `${API_URL}/login`,
    {
      email,
      password,
    }
  );

export const verifyLoginOtp = (data) =>
  axios.post(
    `${API_URL}/verify-login-otp`,
    data
  );

export const resendOtp = (email) =>
  axios.post(
    `${API_URL}/resend-otp`,
    { email }
  );

export const getUsers = () =>
  axios.get(API_URL);

export const deleteUser = (id) =>
  axios.delete(
    `${API_URL}/${id}`
  );

export const updateUser = (
  id,
  user
) =>
  axios.put(
    `${API_URL}/${id}`,
    user
  );