import "./Stats.css";
import { motion } from "framer-motion";

import img1 from "../assets/img/spot1.jpg";
import img2 from "../assets/img/spot2.webp";
import img3 from "../assets/img/spot3.jpg";
import img4 from "../assets/img/spot4.jpg";

const Stats = () => {
  return (
    <section className="stats">
      <div className="stats-wrapper">

        {/* LEFT CONTENT */}
        <motion.div
          className="stats-text"
          initial={{ opacity: 0, x: -80 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: false }}
        >
          <span className="tag">Industrial Welding</span>
          <h2>Spot Welding Electrodes</h2>

          <p>
            Due to our experienced and trained team members, we offer a wide
            range of high-quality spot-welding electrodes manufactured using
            modern precision techniques and premium raw materials.
          </p>

          <p>
            Electrodes made from tungsten, molybdenum, and special alloys are
            ideal for welding highly conductive metals like copper and are used
            in spot, seam, projection, and upset welding processes.
          </p>

          <div className="stats-grid">
            <div>✔ Long service life</div>
            <div>✔ Reproducible quality</div>
            <div>✔ No chipping / homogeneous</div>
            <div>✔ Constant welding resistance</div>
            <div>✔ High density & hardness</div>
            <div>✔ Low maintenance design</div>
          </div>
        </motion.div>

        {/* RIGHT IMAGE STACK */}
        <motion.div
          className="stats-images"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: false }}
          variants={{
            hidden: {},
            visible: { transition: { staggerChildren: 0.15 } },
          }}
        >
          {[img1, img2, img3, img4].map((img, i) => (
            <motion.img
              key={i}
              src={img}
              alt="spot welding"
              variants={{
                hidden: { opacity: 0, y: 60, scale: 0.9 },
                visible: { opacity: 1, y: 0, scale: 1 },
              }}
              transition={{ duration: 0.6 }}
              whileHover={{ scale: 1.08 }}
            />
          ))}
        </motion.div>

      </div>
    </section>
  );
};

export default Stats;
