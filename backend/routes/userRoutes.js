const express = require("express");
const router = express.Router();

const {
  registerUser,
  verifyRegisterOtp,
  loginUser,
  verifyLoginOtp,
  resendOtp,
  getUsers,
  deleteUser,
  updateUser,
} = require("../controllers/userController");

// ===============================
// REGISTER
// ===============================
router.post("/register", registerUser);

// ===============================
// VERIFY REGISTER OTP
// ===============================
router.post("/verify-register-otp", verifyRegisterOtp);

// ===============================
// LOGIN
// ===============================
router.post("/login", loginUser);

// ===============================
// VERIFY LOGIN OTP
// ===============================
router.post("/verify-login-otp", verifyLoginOtp);

// ===============================
// RESEND OTP
// ===============================
router.post("/resend-otp", resendOtp);

// ===============================
// GET ALL USERS
// ===============================
router.get("/", getUsers);

// ===============================
// DELETE USER
// ===============================
router.delete("/:id", deleteUser);

// ===============================
// UPDATE USER
// ===============================
router.put("/:id", updateUser);

module.exports = router;