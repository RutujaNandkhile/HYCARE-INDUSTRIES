import { benefitsData } from "../../data/partnershipData";
import "./partnership.css";
import { motion } from "framer-motion";

/* container animation (stagger children) */
const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
    },
  },
};

/* each item animation */
const item = {
  hidden: { opacity: 0, y: 50 },
  show: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const PartnershipSection = () => {
  return (
    <motion.section
      className="why"
      initial="hidden"
      whileInView="show"
      viewport={{ once: false, amount: 0.3 }} // 🔥 every time animation
      variants={container}
    >
      <div className="why-container">
        {/* small heading */}
        <motion.span className="why-small" variants={item}>
          SOME REASONS
        </motion.span>

        {/* title */}
        <motion.h2 className="why-title" variants={item}>
          Why Choose Us
        </motion.h2>

        {/* grid */}
        <div className="why-grid">
          {benefitsData.map((data, index) => (
            <motion.div className="why-item" key={index} variants={item}>
              
              {/* number animation */}
              <motion.div
                className="why-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 120, damping: 8 }}
                viewport={{ once: false }}
              >
                {(index + 1).toString().padStart(2, "0")}
              </motion.div>

              {/* content */}
              <div className="why-content">
                <h4>{data.title}</h4>
                <p>{data.description}</p>
              </div>

            </motion.div>
          ))}
        </div>
      </div>
    </motion.section>
  );
};

export default PartnershipSection;
