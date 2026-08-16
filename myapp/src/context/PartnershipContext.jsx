import { createContext, useState } from "react";

export const PartnershipContext = createContext();

const PartnershipProvider = ({ children }) => {
  const [benefits, setBenefits] = useState([
    {
      id: 1,
      icon: "⚡",
      title: "What We Offer",
      desc: "e offer customized solutions with reliable quality & on-time delivery.",
    },
    {
      id: 2,
      icon: "✔",
      title: "Quality Assurance",
      desc: "ISO certified manufacturing processes.",
    },
  ]);

  const [stats, setStats] = useState([
    { id: 1, value: "12+", label: "Years Experience" },
    { id: 2, value: "5000+", label: "Projects Completed" },
  ]);

  return (
    <PartnershipContext.Provider
      value={{ benefits, setBenefits, stats, setStats }}
    >
      {children}
    </PartnershipContext.Provider>
  );
};

export default PartnershipProvider;
