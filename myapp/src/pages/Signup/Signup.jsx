import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  addUser,
  verifyRegisterOtp,
  resendOtp,
} from "../../services/userService";

import "./auth.css";

const Signup = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [resendLoading, setResendLoading] = useState(false);

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));

    setError("");
    setSuccess("");
  };

  // =========================
  // REGISTER
  // =========================

  const handleSignup = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const name = form.name.trim();
    const email = form.email.trim().toLowerCase();
    const password = form.password;

    // Frontend validation
    if (!name) {
      setError("Please enter your name.");
      return;
    }

    if (!email) {
      setError("Please enter your email.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (!password) {
      setError("Please enter your password.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    try {
      setLoading(true);

      const response = await addUser({
        name,
        email,
        password,
      });

      console.log("Register response:", response.data);

      setForm({
        name,
        email,
        password,
      });

      setSuccess(
        response.data?.message ||
          "Registration successful. OTP has been sent to your email."
      );

      setStep(2);
    } catch (err) {
      console.error("Registration error:", err);

      const status = err.response?.status;
      const message = err.response?.data?.message;

      if (status === 400) {
        setError(
          message ||
            "Invalid registration details. Please check your information."
        );
      } else if (status === 409) {
        setError(message || "Email already exists.");
      } else if (status === 500) {
        setError(
          message ||
            "Server error. Please check the backend configuration."
        );
      } else {
        setError(
          message ||
            "Registration failed. Please check your internet connection."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // VERIFY OTP
  // =========================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    setError("");
    setSuccess("");

    const email = form.email.trim().toLowerCase();
    const cleanOtp = otp.trim();

    if (!cleanOtp) {
      setError("Please enter OTP.");
      return;
    }

    if (!/^\d{4,6}$/.test(cleanOtp)) {
      setError("Please enter a valid OTP.");
      return;
    }

    try {
      setLoading(true);

      const response = await verifyRegisterOtp({
        email,
        otp: cleanOtp,
      });

      console.log("OTP verification response:", response.data);

      setSuccess(
        response.data?.message ||
          "Registration completed successfully!"
      );

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (err) {
      console.error("OTP verification error:", err);

      setError(
        err.response?.data?.message ||
          "OTP verification failed. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================
  // RESEND OTP
  // =========================

  const handleResend = async () => {
    setError("");
    setSuccess("");

    const email = form.email.trim().toLowerCase();

    if (!email) {
      setError("Email address is missing.");
      return;
    }

    try {
      setResendLoading(true);

      const response = await resendOtp(email);

      console.log("Resend OTP response:", response.data);

      setSuccess(
        response.data?.message ||
          "OTP has been resent successfully."
      );
    } catch (err) {
      console.error("Resend OTP error:", err);

      setError(
        err.response?.data?.message ||
          "Could not resend OTP. Please try again."
      );
    } finally {
      setResendLoading(false);
    }
  };

  // =========================
  // BACK TO SIGNUP
  // =========================

  const handleBack = () => {
    setStep(1);
    setOtp("");
    setError("");
    setSuccess("");
  };

  return (
    <div className="login-page">
      <div className="card p-4 col-md-6 mx-auto mt-4">

        <h4 className="text-center mb-4">
          {step === 1 ? "Create Account" : "Verify OTP"}
        </h4>

        {/* Error */}
        {error && (
          <div className="alert alert-danger" role="alert">
            {error}
          </div>
        )}

        {/* Success */}
        {success && (
          <div className="alert alert-success" role="alert">
            {success}
          </div>
        )}

        {/* =========================
            STEP 1 - REGISTER
        ========================== */}

        {step === 1 && (
          <form onSubmit={handleSignup}>

            {/* Name */}
            <div className="mb-3">
              <label className="form-label">
                Name
              </label>

              <input
                type="text"
                className="form-control"
                name="name"
                placeholder="Enter your name"
                value={form.name}
                onChange={handleChange}
                autoComplete="name"
                required
              />
            </div>

            {/* Email */}
            <div className="mb-3">
              <label className="form-label">
                Email
              </label>

              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Enter your email"
                value={form.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />
            </div>

            {/* Password */}
            <div className="mb-3">
              <label className="form-label">
                Password
              </label>

              <input
                type="password"
                className="form-control"
                name="password"
                placeholder="Enter password"
                value={form.password}
                onChange={handleChange}
                autoComplete="new-password"
                minLength={6}
                required
              />
            </div>

            {/* Register */}
            <button
              type="submit"
              className="btn btn-primary w-100"
              disabled={loading}
            >
              {loading ? "Sending OTP..." : "Register"}
            </button>

          </form>
        )}

        {/* =========================
            STEP 2 - OTP
        ========================== */}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>

            <p className="text-center mb-3">
              OTP has been sent to:
              <br />
              <strong>{form.email}</strong>
            </p>

            {/* OTP */}
            <div className="mb-3">
              <label className="form-label">
                Enter OTP
              </label>

              <input
                type="text"
                className="form-control text-center"
                placeholder="Enter OTP"
                value={otp}
                onChange={(e) => {
                  const value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                  setOtp(value);
                  setError("");
                  setSuccess("");
                }}
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={6}
                required
              />
            </div>

            {/* Verify */}
            <button
              type="submit"
              className="btn btn-primary w-100 mb-2"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>

            {/* Resend */}
            <button
              type="button"
              className="btn btn-link w-100"
              onClick={handleResend}
              disabled={resendLoading}
            >
              {resendLoading ? "Sending..." : "Resend OTP"}
            </button>

            {/* Back */}
            <button
              type="button"
              className="btn btn-outline-secondary w-100 mt-2"
              onClick={handleBack}
              disabled={loading}
            >
              Back
            </button>

          </form>
        )}

      </div>
    </div>
  );
};

export default Signup;