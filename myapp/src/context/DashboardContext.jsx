import { createContext, useState, useEffect } from "react";

export const DashboardContext = createContext();

export const DashboardProvider = ({ children }) => {
  // Load from localStorage or start empty
  const [benefits, setBenefits] = useState(() => {
    return JSON.parse(localStorage.getItem("dashboard_benefits")) || [];
  });

  const [records, setRecords] = useState(() => {
    return JSON.parse(localStorage.getItem("dashboard_records")) || [];
  });

  const [industries, setIndustries] = useState(() => {
    return JSON.parse(localStorage.getItem("dashboard_industries")) || [];
  });

  const [visitorData, setVisitorData] = useState(() => {
    return JSON.parse(localStorage.getItem("dashboard_visitors")) || [
      { time: "10:00", users: 0 },
    ];
  });

  // Save to localStorage whenever data changes
  useEffect(() => {
    localStorage.setItem("dashboard_benefits", JSON.stringify(benefits));
  }, [benefits]);

  useEffect(() => {
    localStorage.setItem("dashboard_records", JSON.stringify(records));
  }, [records]);

  useEffect(() => {
    localStorage.setItem("dashboard_industries", JSON.stringify(industries));
  }, [industries]);

  useEffect(() => {
    localStorage.setItem("dashboard_visitors", JSON.stringify(visitorData));
  }, [visitorData]);

  // Function to add dashboard data
  const addDashboardData = (category, value) => {
    switch (category) {
      case "benefits":
        setBenefits((prev) => [...prev, value]);
        break;
      case "records":
        setRecords((prev) => [...prev, value]);
        break;
      case "industries":
        setIndustries((prev) => [...prev, value]);
        break;
      default:
        break;
    }
  };

  // Function to simulate new visitor
  const addVisitor = () => {
    setVisitorData((prev) => {
      const last = prev[prev.length - 1];
      const nextUsers = last.users + Math.floor(Math.random() * 5 + 1);
      const nextHour = parseInt(last.time.split(":")[0]) + 1;
      const nextTime = `${nextHour}:00`;
      return [...prev, { time: nextTime, users: nextUsers }];
    });
  };

  return (
    <DashboardContext.Provider
      value={{
        benefits,
        records,
        industries,
        visitorData,
        addDashboardData,
        addVisitor,
      }}
    >
      {children}
    </DashboardContext.Provider>
  );
};
