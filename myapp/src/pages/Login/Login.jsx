import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import {
  loginUser,
  verifyLoginOtp,
  resendOtp,
} from "../../services/userService";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");

  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // ==========================================
  // LOGIN
  // ==========================================

  const handleLogin = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await loginUser(email, password);

      // ======================================
      // OTP REQUIRED
      // ======================================

      if (res.data.otpRequired === true) {
        alert(
          res.data.message ||
            "Login OTP sent to your email"
        );

        setStep(2);
        return;
      }

      // ======================================
      // DIRECT LOGIN
      // ======================================

      localStorage.setItem("isLogin", "true");

      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data)
      );

      alert("Login successful!");

      navigate("/dashboard");

    } catch (err) {
      console.error("Login Error:", err);

      if (err.response) {
        alert(
          err.response.data.message ||
            "Invalid Email or Password"
        );
      } else if (err.request) {
        alert(
          "Unable to connect to server. Please try again."
        );
      } else {
        alert("Something went wrong.");
      }
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // VERIFY LOGIN OTP
  // ==========================================

  const handleVerifyOtp = async (e) => {
    e.preventDefault();

    if (loading) return;

    try {
      setLoading(true);

      const res = await verifyLoginOtp({
        email,
        otp,
      });

      localStorage.setItem("isLogin", "true");

      localStorage.setItem(
        "currentUser",
        JSON.stringify(res.data)
      );

      alert("Login successful!");

      navigate("/dashboard");

    } catch (err) {
      console.error(
        "Login OTP Error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Invalid or expired OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // RESEND OTP
  // ==========================================

  const handleResend = async () => {
    if (loading) return;

    try {
      setLoading(true);

      const res = await resendOtp(email);

      alert(
        res.data.message ||
          "OTP resent successfully"
      );

    } catch (err) {
      console.error(
        "Resend OTP Error:",
        err
      );

      alert(
        err.response?.data?.message ||
          "Could not resend OTP"
      );
    } finally {
      setLoading(false);
    }
  };

  // ==========================================
  // BACK TO LOGIN
  // ==========================================

  const handleBackToLogin = () => {
    setStep(1);
    setOtp("");
  };

  return (
    <div className="login-page">

      <div className="login-wrapper">

        <div className="login-card">

          {/* HEADER */}

          <div className="login-header">
            <h2>
              {step === 1
                ? "Welcome Back"
                : "Verify Login"}
            </h2>

            <p>
              {step === 1
                ? "Login to continue to your dashboard"
                : `Enter the OTP sent to ${email}`}
            </p>
          </div>

          {/* =================================
              LOGIN FORM
          ================================= */}

          {step === 1 && (
            <form
              onSubmit={handleLogin}
              className="login-form"
            >

              <div className="form-group">

                <label>Email</label>

                <input
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />

              </div>

              <div className="form-group">

                <label>Password</label>

                <input
                  type="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) =>
                    setPassword(e.target.value)
                  }
                  autoComplete="current-password"
                  required
                />

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={loading}
              >
                {loading
                  ? "Please wait..."
                  : "Login"}
              </button>

            </form>
          )}

          {/* =================================
              LOGIN OTP FORM
          ================================= */}

          {step === 2 && (
            <form
              onSubmit={handleVerifyOtp}
              className="login-form"
            >

              <div className="otp-info">
                <span>🔐</span>

                <p>
                  A verification OTP has been
                  sent to your registered email.
                </p>
              </div>

              <div className="form-group">

                <label>Enter OTP</label>

                <input
                  type="text"
                  inputMode="numeric"
                  maxLength="6"
                  placeholder="Enter 6 digit OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  autoComplete="one-time-code"
                  required
                />

              </div>

              <button
                type="submit"
                className="login-btn"
                disabled={
                  loading || otp.length !== 6
                }
              >
                {loading
                  ? "Verifying..."
                  : "Verify OTP"}
              </button>

              <button
                type="button"
                className="resend-btn"
                onClick={handleResend}
                disabled={loading}
              >
                Resend OTP
              </button>

              <button
                type="button"
                className="back-btn"
                onClick={handleBackToLogin}
              >
                ← Back to Login
              </button>

            </form>
          )}

          {/* REGISTER */}

          <div className="register-link">

            <span>
              New user?
            </span>

            <Link to="/signup">
              Register
            </Link>

          </div>

        </div>

      </div>

    </div>
  );
};

export default Login;