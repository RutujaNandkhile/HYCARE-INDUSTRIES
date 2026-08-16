const bcrypt = require("bcryptjs");
const User = require("../models/userModel");
const generateOtp = require("../utils/generateOtp");
const sendOtpMail = require("../utils/sendOtpMail");

const OTP_VALID_MS = 5 * 60 * 1000;

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser && existingUser.isVerified) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const otp = generateOtp();
    const otpExpiry = new Date(Date.now() + OTP_VALID_MS);

    if (existingUser) {
      existingUser.name = name;
      existingUser.password = hashedPassword;
      existingUser.otp = otp;
      existingUser.otpExpiry = otpExpiry;
      await existingUser.save();
    } else {
      await User.create({ name, email, password: hashedPassword, isVerified: false, otp, otpExpiry });
    }

    await sendOtpMail(email, otp);
    res.status(200).json({ message: "OTP sent to email. Please verify to complete registration.", email });
  } catch (error) {
    console.error("Register Error:", error);
    res.status(500).json({ message: "Server error during registration" });
  }
};

const verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.isVerified) return res.status(400).json({ message: "User already verified" });
    if (!user.otp || !user.otpExpiry)
      return res.status(400).json({ message: "No OTP found. Please register again." });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiry < new Date())
      return res.status(400).json({ message: "OTP expired. Please request a new one." });

    user.isVerified = true;
    user.otp = undefined;
    user.otpExpiry = undefined;
    user.lastOtpLoginAt = new Date(); // starts the 30-day window right after signup
    await user.save();

    res.status(200).json({ message: "Registration successful. You can now login." });
  } catch (error) {
    console.error("Verify Register OTP Error:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

const ONE_MONTH_MS = 30 * 24 * 60 * 60 * 1000;

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid Email or Password" });
    if (!user.isVerified) return res.status(400).json({ message: "Please verify your email first" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid Email or Password" });

    const otpStillValid =
      user.lastOtpLoginAt &&
      Date.now() - new Date(user.lastOtpLoginAt).getTime() < ONE_MONTH_MS;

    if (otpStillValid) {
      // Skip OTP — log the user straight in
      return res.status(200).json({
        otpRequired: false,
        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }

    // OTP required — either first login or 30+ days since last OTP login
    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_VALID_MS);
    await user.save();

    await sendOtpMail(email, otp);

    res.status(200).json({
      otpRequired: true,
      message: "OTP sent to email",
      email: user.email,
    });
  } catch (error) {
    console.error("Login Error:", error);
    res.status(500).json({ message: "Server error during login" });
  }
};

const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });
    if (!user.otp || !user.otpExpiry)
      return res.status(400).json({ message: "No OTP found. Please login again." });
    if (user.otp !== otp) return res.status(400).json({ message: "Invalid OTP" });
    if (user.otpExpiry < new Date())
      return res.status(400).json({ message: "OTP expired. Please login again." });

    user.otp = undefined;
    user.otpExpiry = undefined;
    user.lastOtpLoginAt = new Date(); // reset the 30-day clock
    await user.save();

    res.status(200).json({ _id: user._id, name: user.name, email: user.email });
  } catch (error) {
    console.error("Verify Login OTP Error:", error);
    res.status(500).json({ message: "Server error during OTP verification" });
  }
};

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email });
    if (!user) return res.status(404).json({ message: "User not found" });

    const otp = generateOtp();
    user.otp = otp;
    user.otpExpiry = new Date(Date.now() + OTP_VALID_MS);
    await user.save();

    await sendOtpMail(email, otp);
    res.status(200).json({ message: "OTP resent successfully" });
  } catch (error) {
    console.error("Resend OTP Error:", error);
    res.status(500).json({ message: "Server error while resending OTP" });
  }
};

const getUsers = async (req, res) => {
  try {
    const users = await User.find().select("-password -otp -otpExpiry");
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const deleteUser = async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "User deleted" });
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

const updateUser = async (req, res) => {
  try {
    const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.status(200).json(updated);
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = {
  registerUser, verifyRegisterOtp,
  loginUser, verifyLoginOtp,
  resendOtp, getUsers, deleteUser, updateUser,
};