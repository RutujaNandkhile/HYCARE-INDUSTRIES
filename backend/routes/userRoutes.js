const express = require("express");
const router = express.Router();

const {
  registerUser, verifyRegisterOtp,
  loginUser, verifyLoginOtp,
  resendOtp, getUsers, deleteUser, updateUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/verify-register-otp", verifyRegisterOtp);
router.post("/login", loginUser);
router.post("/verify-login-otp", verifyLoginOtp);
router.post("/resend-otp", resendOtp);
router.get("/", getUsers);
router.delete("/:id", deleteUser);
router.put("/:id", updateUser);

module.exports = router;