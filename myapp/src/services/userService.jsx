import axios from "axios";

const API_URL =
  `${import.meta.env.VITE_API_URL}/users`;

const api = axios.create({
  baseURL: API_URL,

  headers: {
    "Content-Type": "application/json",
  },
});

// Register
export const addUser = (user) =>
  api.post("/register", {
    name: user.name.trim(),
    email: user.email.trim().toLowerCase(),
    password: user.password,
  });

// Verify register OTP
export const verifyRegisterOtp = ({
  email,
  otp,
}) =>
  api.post(
    "/verify-register-otp",
    {
      email:
        email.trim().toLowerCase(),

      otp: String(otp).trim(),
    }
  );

// Login
export const loginUser = (
  email,
  password
) =>
  api.post("/login", {
    email:
      email.trim().toLowerCase(),

    password,
  });

// Verify login OTP
export const verifyLoginOtp = ({
  email,
  otp,
}) =>
  api.post(
    "/verify-login-otp",
    {
      email:
        email.trim().toLowerCase(),

      otp: String(otp).trim(),
    }
  );

// Resend OTP
export const resendOtp = (
  email
) =>
  api.post("/resend-otp", {
    email:
      email.trim().toLowerCase(),
  });

// Get users
export const getUsers = () =>
  api.get("/");

// Delete
export const deleteUser = (
  id
) =>
  api.delete(`/${id}`);

// Update
export const updateUser = (
  id,
  user
) =>
  api.put(`/${id}`, user);