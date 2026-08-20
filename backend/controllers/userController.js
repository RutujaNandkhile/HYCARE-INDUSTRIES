const User = require("../models/userModel");
const Otp = require("../models/Otp");
const bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");

// ==========================================
// EMAIL TRANSPORTER
// ==========================================

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// ==========================================
// GENERATE OTP
// ==========================================

const generateOtp = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// ==========================================
// REGISTER USER
// ==========================================

const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Name, email and password are required",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({
        message: "User already exists",
      });
    }

    const otp = generateOtp();

    const hashedPassword = await bcrypt.hash(password, 10);

    await Otp.deleteMany({ email });

    await Otp.create({
      email,
      otp,
      type: "register",
      userData: {
        name,
        email,
        password: hashedPassword,
      },
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Registration OTP",
      text: `Your registration OTP is ${otp}`,
    });

    res.status(200).json({
      message: "OTP sent to your email",
      otpRequired: true,
    });

  } catch (error) {
    console.error("Register Error:", error);

    res.status(500).json({
      message: "Registration failed",
    });
  }
};

// ==========================================
// VERIFY REGISTER OTP
// ==========================================

const verifyRegisterOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({
      email,
      otp,
      type: "register",
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const existingUser = await User.findOne({ email });

    if (existingUser) {
      await Otp.deleteOne({ _id: otpRecord._id });

      return res.status(400).json({
        message: "User already exists",
      });
    }

    const user = await User.create({
      name: otpRecord.userData.name,
      email: otpRecord.userData.email,
      password: otpRecord.userData.password,
    });

    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    res.status(201).json({
      message: "Registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (error) {
    console.error("Verify Register OTP Error:", error);

    res.status(500).json({
      message: "OTP verification failed",
    });
  }
};

// ==========================================
// LOGIN
// ==========================================

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const passwordMatch = await bcrypt.compare(
      password,
      user.password
    );

    if (!passwordMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    // =========================================
    // CHECK 1 MONTH
    // =========================================

    const now = new Date();

    const oneMonthAgo = new Date();

    oneMonthAgo.setMonth(
      oneMonthAgo.getMonth() - 1
    );

    const otpRequired =
      !user.lastLoginOtpVerifiedAt ||
      user.lastLoginOtpVerifiedAt < oneMonthAgo;

    // =========================================
    // DIRECT LOGIN
    // =========================================

    if (!otpRequired) {
      return res.status(200).json({
        message: "Login successful",
        otpRequired: false,

        _id: user._id,
        name: user.name,
        email: user.email,
      });
    }

    // =========================================
    // LOGIN OTP
    // =========================================

    const otp = generateOtp();

    await Otp.deleteMany({
      email,
      type: "login",
    });

    await Otp.create({
      email,
      otp,
      type: "login",
    });

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Login Verification OTP",
      text: `Your login verification OTP is ${otp}`,
    });

    return res.status(200).json({
      message:
        "Login verification OTP sent to your email",
      otpRequired: true,
    });

  } catch (error) {
    console.error("Login Error:", error);

    return res.status(500).json({
      message: "Login failed",
    });
  }
};

// ==========================================
// VERIFY LOGIN OTP
// ==========================================

const verifyLoginOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const otpRecord = await Otp.findOne({
      email,
      otp,
      type: "login",
    });

    if (!otpRecord) {
      return res.status(400).json({
        message: "Invalid or expired OTP",
      });
    }

    const user = await User.findOne({
      email,
    });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Save today's OTP verification date
    user.lastLoginOtpVerifiedAt = new Date();

    await user.save();

    // Delete used OTP
    await Otp.deleteOne({
      _id: otpRecord._id,
    });

    return res.status(200).json({
      message: "Login successful",

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
      message: "OTP verification failed",
    });
  }
};

// ==========================================
// RESEND OTP
// ==========================================

const resendOtp = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const oldOtp = await Otp.findOne({ email });

    if (!oldOtp) {
      return res.status(400).json({
        message: "No OTP request found",
      });
    }

    const otp = generateOtp();

    oldOtp.otp = otp;

    await oldOtp.save();

    await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Resend OTP",
      text: `Your new OTP is ${otp}`,
    });

    res.status(200).json({
      message: "OTP resent successfully",
    });

  } catch (error) {
    console.error("Resend OTP Error:", error);

    res.status(500).json({
      message: "Could not resend OTP",
    });
  }
};

// ==========================================
// GET USERS
// ==========================================

const getUsers = async (req, res) => {
  try {
    const users = await User.find()
      .select("-password")
      .sort({ _id: -1 });

    res.status(200).json(users);

  } catch (error) {
    console.error("Get Users Error:", error);

    res.status(500).json({
      message: "Failed to fetch users",
    });
  }
};

// ==========================================
// DELETE USER
// ==========================================

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User deleted successfully",
    });

  } catch (error) {
    console.error("Delete User Error:", error);

    res.status(500).json({
      message: "Failed to delete user",
    });
  }
};

// ==========================================
// UPDATE USER
// ==========================================

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, email } = req.body;

    const user = await User.findByIdAndUpdate(
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
        message: "User not found",
      });
    }

    res.status(200).json({
      message: "User updated successfully",
      user,
    });

  } catch (error) {
    console.error("Update User Error:", error);

    res.status(500).json({
      message: "Failed to update user",
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