import axios from "axios";

const API_URL = `${import.meta.env.VITE_API_URL}/users`;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export const addUser = async (user) => {
  return api.post("/register", {
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: user.password,
  });
};

export const verifyRegisterOtp = async ({ email, otp }) => {
  return api.post("/verify-register-otp", {
    email: email.trim().toLowerCase(),
    otp: String(otp).trim(),
  });
};

export const loginUser = async (email, password) => {
  return api.post("/login", {
    email: email.trim().toLowerCase(),
    password,
  });
};

export const verifyLoginOtp = async ({ email, otp }) => {
  return api.post("/verify-login-otp", {
    email: email.trim().toLowerCase(),
    otp: String(otp).trim(),
  });
};

export const resendOtp = async (email) => {
  return api.post("/resend-otp", {
    email: email.trim().toLowerCase(),
  });
};

export const getUsers = async () => {
  return api.get("/");
};

export const deleteUser = async (id) => {
  return api.delete(`/${id}`);
};

export const updateUser = async (id, user) => {
  return api.put(`/${id}`, user);
};