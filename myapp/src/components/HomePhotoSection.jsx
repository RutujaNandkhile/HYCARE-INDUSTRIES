import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPhotos } from "../services/photoService";
import "./HomePhotoSection.css";

const HomePhotoSection = () => {
  const [photos, setPhotos] = useState([]);
  const [index, setIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    loadPhotos();
  }, []);

  const loadPhotos = async () => {
    const data = await getPhotos();
    setPhotos(data);
  };

  const nextSlide = () => setIndex((prev) => (prev + 1) % photos.length);
  const prevSlide = () => setIndex((prev) => (prev - 1 + photos.length) % photos.length);

  useEffect(() => {
    if (!photos.length || isPaused) return;
    const interval = setInterval(nextSlide, 4000); // 4 seconds for a premium feel
    return () => clearInterval(interval);
  }, [photos, isPaused, index]);

  if (!photos.length) return null;

  return (
    <section className="curved-section-wrapper">
      <div className="content-header">
        <motion.h2 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="slider-title"
        >
          Our Work
        </motion.h2>
      </div>

      <div 
        className="carousel-container"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="carousel-stage">
          {photos.map((photo, i) => {
            let position = i - index;

            // Infinite loop math
            if (position < -Math.floor(photos.length / 2)) position += photos.length;
            if (position > Math.floor(photos.length / 2)) position -= photos.length;

            const isCenter = position === 0;

            return (
              <motion.div
                key={photo._id || i}
                className="carousel-card"
                initial={false}
                animate={{
                  x: position * 340, // Increased spacing for cleaner layout
                  scale: isCenter ? 1 : 0.8,
                  rotateY: position * -35,
                  z: Math.abs(position) * -150,
                  opacity: Math.abs(position) > 2 ? 0 : 1,
                }}
                transition={{
                  type: "spring",
                  stiffness: 100, // Softer stiffness for more elegant movement
                  damping: 18,
                }}
                style={{
                  zIndex: 10 - Math.abs(position),
                }}
              >
                <div className={`card-inner ${isCenter ? "active-glow" : ""}`}>
                  <img 
                    src={`http://localhost:5000/uploads/${photo.image}`} 
                    alt={photo.title} 
                    className="card-image"
                  />
                  <div className="reflection-overlay"></div>
                  
                  <AnimatePresence>
                    {isCenter && (
                      <motion.div 
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0 }}
                        className="card-label"
                      >
                        <h3>{photo.title}</h3>
                        <p>Let your dreams come true</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      <div className="navigation-footer">
        <div className="nav-controls">
          <button onClick={prevSlide} className="nav-circle-btn">‹</button>
          <button className="cta-hire-btn">Photo</button>
          <button onClick={nextSlide} className="nav-circle-btn">›</button>
        </div>
      </div>
    </section>
  );
};

export default HomePhotoSection;