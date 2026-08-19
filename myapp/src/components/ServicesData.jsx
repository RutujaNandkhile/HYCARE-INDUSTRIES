import {
  FaCogs,
  FaBolt,
  FaCompressAlt,
  FaTools,
  FaCube,
  FaIndustry,
} from "react-icons/fa";

import img1 from "../assets/img/cnc.jpg";
import img2 from "../assets/img/spot1.JPG";
import img3 from "../assets/img/spring.jpg";
import img4 from "../assets/img/fabrication.jpg";
import img5 from "../assets/img/5axis.jpg";
import img6 from "../assets/img/other.jpg";

const ServicesData = [
  
  {
    id: 1,
    icon: <FaCogs />,
    title: "CNC and VMC Machining",
    desc: "High precision CNC & VMC machining for all production needs.",
    image: img1,
  },
  {
    id: 2,
    icon: <FaBolt />,
    title: "Spot Welding",
    desc: "Strong and durable welding for complex assemblies.",
    image: img2,
  },
  {
    id: 3,
    icon: <FaCompressAlt />,
    title: "Spring Manufacturing",
    desc: "Custom springs with strict quality standards.",
    image: img3,
  },
  {
    id: 4,
    icon: <FaTools />,
    title: "Fabrication Services",
    desc: "Complete fabrication from small to large structures.",
    image: img4,
  },
  {
    id: 5,
    icon: <FaCube />,
    title: "5-Axis CNC Machining",
    desc: "Complex geometry machining in single setup.",
    image: img5,
  },
  {
    id: 6,
    icon: <FaIndustry />,
    title: "Other Services",
    desc: "Prototype, tooling, and custom machining solutions.",
    image: img6,
  },
];

export default ServicesData;
