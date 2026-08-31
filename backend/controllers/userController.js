const User = require("../models/userModel");
const Otp = require("../models/Otp");

const bcrypt = require("bcryptjs");

const sendOtpMail = require("../utils/sendOtpMail");

const generateOtp = require("../utils/generateOtp");

// ==========================================
// REGISTER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const name = req.body.name?.trim();

    const email =
      req.body.email
        ?.trim()
        .toLowerCase();

    const password =
      req.body.password;

    // Validation
    if (
      !name ||
      !email ||
      !password
    ) {
      return res.status(400).json({
        success: false,
        message:
          "Name, email and password are required",
      });
    }

    if (password.length < 6) {
      return res.status(400).json({
        success: false,
        message:
          "Password must be at least 6 characters",
      });
    }

    // Email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      return res.status(400).json({
        success: false,
        message:
          "Please enter a valid email address",
      });
    }

    // Check existing user
    const existingUser =
      await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        success: false,
        message:
          "User already exists",
      });
    }

    // Generate OTP
    const otp = generateOtp();

    // Hash password
    const hashedPassword =
      await bcrypt.hash(
        password,
        10
      );

    // Delete old registration OTP
    await Otp.deleteMany({
      email,
      type: "register",
    });

    // Send email
    await sendOtpMail(
      email,
      otp
    );

    // Save OTP
    await Otp.create({
      email,
      otp,
      type: "register",

      userData: {
        name,
        email,
        password:
          hashedPassword,
      },
    });

    return res.status(200).json({
      success: true,
      message:
        "OTP sent to your email",
      otpRequired: true,
    });

  } catch (error) {
    console.error(
      "Register Error:",
      error
    );

    return res.status(500).json({
      success: false,
      message:
        "Registration failed",
      debug: error.message,
    });
  }
};

// ==========================================
// VERIFY REGISTER OTP
// ==========================================

const verifyRegisterOtp =
  async (req, res) => {
    try {
      const email =
        req.body.email
          ?.trim()
          .toLowerCase();

      const otp =
        req.body.otp
          ?.trim();

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message:
            "Email and OTP are required",
        });
      }

      const otpRecord =
        await Otp.findOne({
          email,
          otp,
          type: "register",
        });

      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid or expired OTP",
        });
      }

      const existingUser =
        await User.findOne({
          email,
        });

      if (existingUser) {
        await Otp.deleteOne({
          _id: otpRecord._id,
        });

        return res.status(400).json({
          success: false,
          message:
            "User already exists",
        });
      }

      const user =
        await User.create({
          name:
            otpRecord.userData.name,

          email:
            otpRecord.userData.email,

          password:
            otpRecord.userData.password,
        });

      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(201).json({
        success: true,

        message:
          "Registered successfully",

        user: {
          id: user._id,
          name: user.name,
          email: user.email,
        },
      });

    } catch (error) {
      console.error(
        "Verify Register OTP Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "OTP verification failed",
        debug: error.message,
      });
    }
  };

// ==========================================
// LOGIN
// ==========================================

const loginUser =
  async (req, res) => {
    try {
      const email =
        req.body.email
          ?.trim()
          .toLowerCase();

      const password =
        req.body.password;

      if (!email || !password) {
        return res.status(400).json({
          success: false,
          message:
            "Email and password are required",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password",
        });
      }

      const passwordMatch =
        await bcrypt.compare(
          password,
          user.password
        );

      if (!passwordMatch) {
        return res.status(401).json({
          success: false,
          message:
            "Invalid email or password",
        });
      }

      // =====================================
      // ONE MONTH CHECK
      // =====================================

      const oneMonthAgo =
        new Date();

      oneMonthAgo.setMonth(
        oneMonthAgo.getMonth() - 1
      );

      const otpRequired =
        !user.lastLoginOtpVerifiedAt ||
        user.lastLoginOtpVerifiedAt <
          oneMonthAgo;

      // =====================================
      // DIRECT LOGIN
      // =====================================

      if (!otpRequired) {
        return res.status(200).json({
          success: true,

          message:
            "Login successful",

          otpRequired: false,

          _id: user._id,
          name: user.name,
          email: user.email,
        });
      }

      // =====================================
      // LOGIN OTP
      // =====================================

      const otp =
        generateOtp();

      await Otp.deleteMany({
        email,
        type: "login",
      });

      await sendOtpMail(
        email,
        otp
      );

      await Otp.create({
        email,
        otp,
        type: "login",
      });

      return res.status(200).json({
        success: true,

        message:
          "Login verification OTP sent to your email",

        otpRequired: true,
      });

    } catch (error) {
      console.error(
        "Login Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Login failed",
        debug: error.message,
      });
    }
  };

// ==========================================
// VERIFY LOGIN OTP
// ==========================================

const verifyLoginOtp =
  async (req, res) => {
    try {
      const email =
        req.body.email
          ?.trim()
          .toLowerCase();

      const otp =
        req.body.otp
          ?.trim();

      if (!email || !otp) {
        return res.status(400).json({
          success: false,
          message:
            "Email and OTP are required",
        });
      }

      const otpRecord =
        await Otp.findOne({
          email,
          otp,
          type: "login",
        });

      if (!otpRecord) {
        return res.status(400).json({
          success: false,
          message:
            "Invalid or expired OTP",
        });
      }

      const user =
        await User.findOne({
          email,
        });

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      user.lastLoginOtpVerifiedAt =
        new Date();

      await user.save();

      await Otp.deleteOne({
        _id: otpRecord._id,
      });

      return res.status(200).json({
        success: true,

        message:
          "Login successful",

        _id: user._id,
        name: user.name,
        email: user.email,
      });

    } catch (error) {
      console.error(
        "Verify Login OTP Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "OTP verification failed",
        debug: error.message,
      });
    }
  };

// ==========================================
// RESEND OTP
// ==========================================

const resendOtp =
  async (req, res) => {
    try {
      const email =
        req.body.email
          ?.trim()
          .toLowerCase();

      if (!email) {
        return res.status(400).json({
          success: false,
          message:
            "Email is required",
        });
      }

      const oldOtp =
        await Otp.findOne({
          email,
        }).sort({
          createdAt: -1,
        });

      if (!oldOtp) {
        return res.status(400).json({
          success: false,
          message:
            "No OTP request found",
        });
      }

      const otp =
        generateOtp();

      await sendOtpMail(
        email,
        otp
      );

      oldOtp.otp = otp;
      oldOtp.createdAt = new Date();

      await oldOtp.save();

      return res.status(200).json({
        success: true,
        message:
          "OTP resent successfully",
      });

    } catch (error) {
      console.error(
        "Resend OTP Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Could not resend OTP",
        debug: error.message,
      });
    }
  };

// ==========================================
// GET USERS
// ==========================================

const getUsers =
  async (req, res) => {
    try {
      const users =
        await User.find()
          .select("-password")
          .sort({
            _id: -1,
          });

      return res.status(200).json(
        users
      );

    } catch (error) {
      console.error(
        "Get Users Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to fetch users",
      });
    }
  };

// ==========================================
// DELETE USER
// ==========================================

const deleteUser =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const user =
        await User.findByIdAndDelete(
          id
        );

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      return res.status(200).json({
        success: true,
        message:
          "User deleted successfully",
      });

    } catch (error) {
      console.error(
        "Delete User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to delete user",
      });
    }
  };

// ==========================================
// UPDATE USER
// ==========================================

const updateUser =
  async (req, res) => {
    try {
      const { id } =
        req.params;

      const name =
        req.body.name?.trim();

      const email =
        req.body.email
          ?.trim()
          .toLowerCase();

      const user =
        await User.findByIdAndUpdate(
          id,

          {
            name,
            email,
          },

          {
            new: true,
            runValidators: true,
          }
        ).select("-password");

      if (!user) {
        return res.status(404).json({
          success: false,
          message:
            "User not found",
        });
      }

      return res.status(200).json({
        success: true,

        message:
          "User updated successfully",

        user,
      });

    } catch (error) {
      console.error(
        "Update User Error:",
        error
      );

      return res.status(500).json({
        success: false,
        message:
          "Failed to update user",
      });
    }
  };

// ==========================================
// EXPORT
// ==========================================

module.exports = {
  registerUser,
  verifyRegisterOtp,
  loginUser,
  verifyLoginOtp,
  resendOtp,
  getUsers,
  deleteUser,
  updateUser,
};