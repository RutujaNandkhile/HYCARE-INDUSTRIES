import { useEffect, useState } from "react";
import About from "./About";
import Stats from "./Stats";
import Services from "./Services";
import Partners from "./Partners";
import PartnershipSection from "./Partnership/PartnershipSection";
import HomePhotoSection from "../components/HomePhotoSection";
import FAQComponent from "./FAQComponent";
import photoStore from "../store/photostore";
import HomeSlider from "./HomeSlider";

const Home = () => {
  const [photos, setPhotos] = useState([]);

  useEffect(() => {
    const unsub = photoStore.subscribe(setPhotos);
    return unsub;
  }, []);

  return (
    <>
      {/* HERO SECTION */}
      <section className="hero-video-section">
        <div className="hero-overlay"></div>
        <HomeSlider />
      </section>

      {/* OTHER HOME SECTIONS */}
       <About/>
      <Stats />
      <Services />
      {/* <Partners /> */}
      <HomePhotoSection photos={photos} />
      <PartnershipSection />
      <FAQComponent />
     
    </>
  );
};

export default Home;
