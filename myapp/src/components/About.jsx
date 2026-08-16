import React from "react";
import "./Home.css";
import { motion } from "framer-motion";

import img from "../assets/img/job.jpg";

const About = () => {
  return (
    <section className="about-section">

      <motion.h2 className="heading"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: .6 }}
      >
        About Us
      </motion.h2>

      <motion.p
        className="about-sub"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ delay: .2, duration: .6 }}
      >
        Preparing Skilled Mechanical Engineers For High-Demand Industries
      </motion.p>

      <motion.h2
        className="about-title"
        initial={{ opacity: 0, y: -40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: .3, duration: .7 }}
      >
        Specialized Training In CNC Machining, Fabrication, <br />
        Welding Technology, and Industrial Maintenance.
      </motion.h2>

      <div className="about-grid">

        {/* LEFT IMAGE BLOCK */}
        <motion.div
          className="about-image-box"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >
          <img src={img} alt="industrial" />

          <motion.div
            className="about-orange-card"
            initial={{ opacity: 0, scale: .8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: .4, duration: .5 }}
          >
            <span className="icon">⚙</span>
            <p>Latest Solutions, And<br/>Decades Of Experience.</p>
          </motion.div>
        </motion.div>

        {/* CENTER CONTENT */}
        <motion.div
          className="about-content"
          initial={{ opacity: 0, y: 60 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: .8 }}
        >
          <p>
            HyCare Engineering provides full range of industrial services and
            solutions in manufacturing and engineering worldwide. We help
            businesses build better and faster with reliable solutions.
          </p>

          <ul>
            <li>Quality Control System, 100% Satisfaction Guarantee</li>
            <li>Highly Professional Staff, Accurate Testing Processes</li>
            <li>Unrivalled workmanship, Professional and Qualified</li>
            <li>Environmental Sensitivity, Personalised solutions</li>
          </ul>

          <motion.button
            className="about-btn"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            More About Us
          </motion.button>
        </motion.div>

        {/* RIGHT STATS */}
        <motion.div
          className="about-stats"
          initial={{ opacity: 0, x: 80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: .8 }}
        >
          <div>
            <h3>8,500+</h3>
            <p>Industrial Springs Manufactured With Precision Engineering</p>
          </div>

          <div>
            <h3>3,200+</h3>
            <p>Welding & Fabrication Projects Delivered To Industries</p>
          </div>
        </motion.div>

      </div>
    </section>
  );
};

export default About;
