import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getPhotos } from "../services/photoService";
import "./CategoryGallery.css";

const CategoryGallery = ({ category }) => {

  const [photos, setPhotos] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    loadPhotos();
  }, [category]);

  const loadPhotos = async () => {

    const data = await getPhotos();

    const filtered = data.filter((p) => p.category === category);

    setPhotos(filtered);

  };

  if (!photos.length) {
    return (
      <p style={{ textAlign: "center", marginTop: "50px", color: "#555" }}>
        No photos in "{category}"
      </p>
    );
  }

  return (
    <section className="category-gallery-section">

      <div className="container py-5 text-center">

        <h2 className="gallery-title">{category}</h2>

        <motion.div
          className="row g-4 justify-content-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >

          {photos.map((p) => (

            <motion.div
              key={p._id}
              className="col-6 col-md-4 col-lg-3"
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >

              <div
                className="photo-card"
                onClick={() => setSelectedImage(p.image)}
              >

                <motion.img
                  src={`http://localhost:5000/uploads/${p.image}`}
                  alt={p.title}
                  className="photo-img"
                />

              </div>

            </motion.div>

          ))}

        </motion.div>

        {/* Lightbox */}

        <AnimatePresence>

          {selectedImage && (

            <motion.div
              className="lightbox-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setSelectedImage(null)}
            >

              <motion.img
                src={`http://localhost:5000/uploads/${selectedImage}`}
                alt="Enlarged"
                className="lightbox-image"
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0.8 }}
              />

            </motion.div>

          )}

        </AnimatePresence>

      </div>

    </section>
  );

};

export default CategoryGallery;