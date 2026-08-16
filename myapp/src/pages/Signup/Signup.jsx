import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { addUser, verifyRegisterOtp, resendOtp } from "../../services/userService";
import "./auth.css";

const Signup = () => {
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [otp, setOtp] = useState("");
  const [step, setStep] = useState(1); // 1 = form, 2 = otp
  const navigate = useNavigate();

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await addUser(form);
      alert(res.data.message || "OTP sent to your email");
      setStep(2);
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "Registration failed");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await verifyRegisterOtp({ email: form.email, otp });
      alert(res.data.message || "Registered successfully!");
      navigate("/login");
    } catch (err) {
      console.error(err);
      alert(err.response?.data?.message || "OTP verification failed");
    }
  };

  const handleResend = async () => {
    try {
      const res = await resendOtp(form.email);
      alert(res.data.message || "OTP resent");
    } catch (err) {
      alert(err.response?.data?.message || "Could not resend OTP");
    }
  };

  return (
    <div className="login-page">
      <div className="card p-4 col-md-6 mx-auto mt-4">
        <h4>Signup</h4>

        {step === 1 && (
          <form onSubmit={handleSignup}>
            <input
              className="form-control mb-3"
              name="name"
              placeholder="Name"
              value={form.name}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-3"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              required
            />
            <input
              className="form-control mb-3"
              type="password"
              name="password"
              placeholder="Password"
              value={form.password}
              onChange={handleChange}
              required
            />
            <button className="btn btn-primary w-100">Register</button>
          </form>
        )}

        {step === 2 && (
          <form onSubmit={handleVerifyOtp}>
            <p>Enter the OTP sent to {form.email}</p>
            <input
              className="form-control mb-3"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />
            <button className="btn btn-primary w-100 mb-2">Verify OTP</button>
            <button
              type="button"
              className="btn btn-link w-100"
              onClick={handleResend}
            >
              Resend OTP
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default Signup;