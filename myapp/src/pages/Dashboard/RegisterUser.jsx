import React, { useState } from "react";
import { addUser } from "../../services/userService";

const RegisterUser = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await addUser(form);
      alert("Registration successful!");
      setForm({ name: "", email: "", password: "" });
    } catch (err) {
      console.error(err);
      alert("Registration failed");
    }
  };

  return (
    <div className="container mt-4">
      <h3>Register</h3>
      <form onSubmit={handleSubmit}>
        <input className="form-control mb-2" name="name" placeholder="Name" value={form.name} onChange={handleChange} required />
        <input className="form-control mb-2" name="email" placeholder="Email" value={form.email} onChange={handleChange} required />
        <input className="form-control mb-2" type="password" name="password" placeholder="Password" value={form.password} onChange={handleChange} required />
        <button className="btn btn-success w-100">Register</button>
      </form>
    </div>
  );
};

export default RegisterUser;
