import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { loginUser, verifyLoginOtp, resendOtp } from "../../services/userService";
import "./Login.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = credentials, 2 = otp
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await loginUser(email, password);

      if (res.data.otpRequired) {
        alert(res.data.message || "OTP sent to your email");
        setStep(2);
        return;
      }

      // OTP not required — log in directly
      localStorage.setItem("isLogin", "true");
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("Login Error:", err);
      if (err.response) {
        alert(err.response.data.message || "Invalid Email or Password");
      } else if (err.request) {
        alert("Server Error: Backend server is not running.");
      } else {
        alert("Server Error");
      }
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyLoginOtp({ email, otp });

      localStorage.setItem("isLogin", "true");
      localStorage.setItem("currentUser", JSON.stringify(res.data));

      alert("Login successful!");
      navigate("/dashboard");
    } catch (err) {
      console.error("OTP Verify Error:", err);
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendOtp(email);
      alert(res.data.message || "OTP resent");
    } catch (err) {
      alert(err.response?.data?.message || "Could not resend OTP");
    }
  };

  return (
    <div className="login-page container-fluid">
      <div className="login container mt-4">
        <h3>Login</h3>

        {step === 1 && (
          <form onSubmit={handleLogin}>
            <input
              className="form-control mb-2"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              className="form-control mb-2"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100">
              Login
            </button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p>Enter the OTP sent to {email}</p>
            <input
              className="form-control mb-2"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button type="submit" className="btn btn-primary w-100 mb-2">
              Verify OTP
            </button>
            <button
              type="button"
              className="btn btn-link w-100"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </form>
        )}

        <p className="mt-3">
          New user? <Link to="/signup">Register</Link>
        </p>
      </div>
    </div>
  );
};

export default Login;