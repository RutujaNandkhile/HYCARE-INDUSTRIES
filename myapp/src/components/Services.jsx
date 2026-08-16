import "./Services.css";
import ServiceCard from "./ServiceCard";
import ServicesData from "./ServicesData";
import { motion } from "framer-motion";

const Services = () => {
  return (
    <section className="services">
      <div className="services-container">

        {/* LEFT PANEL */}
        <motion.div
          className="services-left"
          initial={{ opacity: 0, scale: 0.8, y: 40 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          viewport={{ once: false }}   // 🔥 animation repeat
        >
          <h4>Our Services</h4>
          <h2>Our Expertise</h2>
          <p>
            Comprehensive CNC machining services with advanced equipment and
            experienced operators for all your manufacturing needs.
          </p>

          <motion.button
            className="btn-primary"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            Explore All Our Services
          </motion.button>
        </motion.div>

        {/* RIGHT GRID */}
        <motion.div
          className="services-grid"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}   // 🔥 repeat every scroll
          variants={{
            hidden: {},
            visible: {
              transition: { staggerChildren: 0.15 },
            },
          }}
        >
          {ServicesData.map((item) => (
            <motion.div
              key={item.id}
              variants={{
                hidden: { opacity: 0, y: 50, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.5 }}
              whileHover={{
                y: -10,
                scale: 1.05,
                boxShadow: "0px 15px 35px rgba(0,0,0,0.12)",
              }}
            >
              <ServiceCard
                icon={item.icon}
                title={item.title}
                desc={item.desc}
                image={item.image}
              />
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Services;
