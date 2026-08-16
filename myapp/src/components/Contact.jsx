import "./Contact.css";
import { Mail, Phone, MapPin } from "lucide-react";
import { motion } from "framer-motion";
import { useState } from "react";
import axios from "axios";

const Contact = () => {

  // FORM STATE
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    message: ""
  });

  // INPUT CHANGE
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await axios.post("http://localhost:3001/contacts", formData);
      alert("Message Sent ✅");

      setFormData({
        name: "",
        email: "",
        phone: "",
        message: ""
      });

    } catch (err) {
      alert("Error sending message");
    }
  };

  return (
    <section className="contact-section">

      <motion.h1
        className="contact-main-title"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        Contact Us
      </motion.h1>

      <div className="contact-container">

        {/* LEFT INFO */}
        <motion.div
          className="contact-info"
          initial={{ x: -80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          {/* <h2 className="contact-heading">Contact Information</h2> */}

          <div className="info-box phone-box">
            <Phone className="icon" />
            <a href="tel:7620335231">7620335231</a>,
            <p>Call us anytime for support.</p>
          </div>

          <div className="info-box mail-box">
            <Mail className="icon" />
            <a href="mailto:hycareengineering23@gmail.com">
              hycareengineering23@gmail.com
            </a>
            <p>Email us for business queries.</p>
          </div>

          <div className="info-box location-box">
            <MapPin className="icon" />
            <h4>J Block, MIDC, Bhosari</h4>
            <p>10/3/4/152 J Block, MIDC, Bhosari Pimpri-Chinchwad, Maharashtra 411018.</p>
          </div>
        </motion.div>

        {/* RIGHT FORM */}
        <motion.div
          className="contact-form"
          initial={{ x: 80, opacity: 0 }}
          whileInView={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.7 }}
        >
          <h2>Get In Touch !!</h2>

          <form onSubmit={handleSubmit}>
            <input
              name="name"
              placeholder="Name"
              value={formData.name}
              onChange={handleChange}
              required
            />

            <input
              name="email"
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />

            <input
              name="phone"
              placeholder="Phone"
              value={formData.phone}
              onChange={handleChange}
            />

            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              required
            ></textarea>

            <button type="submit">Submit Form</button>
          </form>
        </motion.div>

      </div>
    </section>
  );
};

export default Contact;