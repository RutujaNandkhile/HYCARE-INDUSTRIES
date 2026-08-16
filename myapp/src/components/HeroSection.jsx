// HeroSection.jsx
import React from "react";
import FeatureCard from "./FeatureCard";
import heroImg from "../assets/img/wood-worker.jpg";

const HeroSection = () => {
  const features = [
    {
      id: 1,
      title: "Experienced",
      description: "Lorem ipsum dolor.",
      icon: "🛠️",
      highlight: false,
    },
    {
      id: 2,
      title: "Professional",
      description: "Lorem ipsum dolor.",
      icon: "👷",
      highlight: true,
    },
    {
      id: 3,
      title: "Expert Team",
      description: "Lorem ipsum dolor.",
      icon: "👥",
      highlight: false,
    },
    {
      id: 4,
      title: "Affordable",
      description: "Lorem ipsum dolor.",
      icon: "💰",
      highlight: false,
    },
  ];

  return (
    <FeatureCard
      image={heroImg}
      heading="Quality Workmanship At Competitive Prices"
      description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec ullamcorper mattis."
      features={features}
    />
  );
};

export default HeroSection;
