import { useEffect, useState } from "react";
import sliderStore from "../store/sliderStore";
import "./HomeSlider.css";

const HomeSlider = () => {
  const [sliders, setSliders] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => sliderStore.subscribe(setSliders), []);

  useEffect(() => {
    if (sliders.length <= 1) return;

    const timer = setInterval(() => {
      setIndex(prev => (prev + 1) % sliders.length);
    }, 4000);

    return () => clearInterval(timer);
  }, [sliders]);

  if (!sliders.length) return null;

  const currentSlide = sliders[index];

  return (
    <section className="hero-section">

      {/* IMAGE */}
      <div className="hero-image">
        <img src={currentSlide.image} alt={currentSlide.title} />
      </div>

      {/* CONTENT */}
      <div className="hero-content">

        <h1>{currentSlide.title}</h1>

        <ul className="hero-list">
          <li>Quality Control System, 100% Satisfaction Guarantee</li>
          <li>Highly Professional Staff, Accurate Testing Processes</li>
          <li>Professional & Qualified Workforce</li>
        </ul>

        <div className="hero-buttons">
          <button className="btn-orange">About Us</button>
          <button className="btn-white">Our Services</button>
        </div>

      </div>

      {/* FLOATING CARDS */}
      <div className="hero-cards">
        <div className="hero-card">
          <h4>Personalised Solutions</h4>
          <p>
            The world of industrial supply chains involves risks
            and regulations.
          </p>
        </div>

        <div className="hero-card">
          <h4>Transparent Pricing</h4>
          <p>
            Flexible pricing options available globally.
          </p>
        </div>
      </div>

    </section>
  );
};

export default HomeSlider;
