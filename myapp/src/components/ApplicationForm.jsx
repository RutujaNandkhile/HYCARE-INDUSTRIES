import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./ApplicationForm.css";

const ApplicationForm = () => {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    experience: "",
    resume: null
  });

  const handleChange = (e) => {
    if (e.target.type === "file") {
      setForm({ ...form, resume: e.target.files[0] });
    } else {
      setForm({ ...form, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !form.name ||
      !form.email ||
      !form.phone ||
      !form.address ||
      !form.course ||
      !form.experience ||
      !form.resume
    ) {
      alert("Please fill all fields and upload resume");
      return;
    }

    const oldData =
      JSON.parse(localStorage.getItem("applications")) || [];

    const updatedData = [
      ...oldData,
      {
        ...form,
        resume: form.resume.name // store only file name
      }
    ];

    localStorage.setItem("applications", JSON.stringify(updatedData));

    alert("Application Submitted Successfully");

    navigate("/dashboard/application-list");

    setForm({
      name: "",
      email: "",
      phone: "",
      address: "",
      course: "",
      experience: "",
      resume: null
    });
  };

  return (
    <>
      {/* HERO SECTION */}
      <div className="apply-hero">
        <div className="hero-application">
          <div className="hero-content">
            <h1>Apply for a Job</h1>
            <p>
              We are always looking for talented candidates.
              Fill the form below and our team will contact you.
            </p>
          </div>
        </div>
      </div>

      {/* FORM SECTION */}
      <div className="apply-section">
        <div className="apply-container">
          <form className="apply-form" onSubmit={handleSubmit}>

            <div className="form-row">
              <input
                type="text"
                name="name"
                placeholder="Full Name"
                value={form.name}
                onChange={handleChange}
              />

              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={form.phone}
                onChange={handleChange}
              />

              <input
                type="text"
                name="address"
                placeholder="Address"
                value={form.address}
                onChange={handleChange}
              />
            </div>

            <div className="form-row">
              <select
                name="course"
                value={form.course}
                onChange={handleChange}
              >
                <option value="">Select Course</option>
                <option value="BCA">BCA</option>
                <option value="MCA">MCA</option>
                <option value="B.Tech">B.Tech</option>
              </select>

              <input
                type="number"
                name="experience"
                placeholder="Experience (Years)"
                value={form.experience}
                onChange={handleChange}
              />
            </div>

            {/* FILE UPLOAD ROW */}
            <div className="form-row full-width">
              <input
                type="file"
                name="resume"
                accept=".pdf,.doc,.docx"
                onChange={handleChange}
              />
            </div>

            <button type="submit" className="submit-btn">
              Submit Application
            </button>

          </form>
        </div>
      </div>
    </>
  );
};

export default ApplicationForm;
