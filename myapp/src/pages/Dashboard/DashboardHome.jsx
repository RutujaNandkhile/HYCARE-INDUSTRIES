import { useContext, useState, useEffect } from "react";
import { DashboardContext } from "../../context/DashboardContext";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import "./dashboardHome.css";

const COLORS = ["#0088FE", "#00C49F", "#FFBB28"];

const DashboardHome = () => {
  const { benefits, records, industries, addDashboardData } =
    useContext(DashboardContext);

  const [showForm, setShowForm] = useState(false);
  const [category, setCategory] = useState("benefits");
  const [input, setInput] = useState("");

  // Simulated visitor data
  const [visitorData, setVisitorData] = useState([
    { time: "10:00", users: 0 },
    { time: "11:00", users: 0 },
    { time: "12:00", users: 0 },
  ]);

  // Simulate growth every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setVisitorData((prev) => {
        const last = prev[prev.length - 1];
        const nextUsers = last.users + Math.floor(Math.random() * 5 + 1); // growth
        const nextHour = parseInt(last.time.split(":")[0]) + 1;
        const nextTime = `${nextHour}:00`;
        return [...prev, { time: nextTime, users: nextUsers }];
      });
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const handleSave = () => {
    if (!input.trim()) return;
    addDashboardData(category, input);
    setInput("");
    setShowForm(false);
  };

  const pieData = [
    { name: "Benefits", value: benefits.length || 1 },
    { name: "Track Records", value: records.length || 1 },
    { name: "Industries", value: industries.length || 1 },
  ];

  return (
    <div className="dashboard-home">
      {/* HEADER */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <button className="add-btn" onClick={() => setShowForm(!showForm)}>
          ＋ Add Data
        </button>
      </div>

      {/* INLINE ADD FORM */}
      {showForm && (
        <div className="add-form">
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="benefits">Benefits</option>
            <option value="records">Track Records</option>
            <option value="industries">Industries</option>
          </select>

          <input
            type="text"
            placeholder="Enter value"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />

          <button onClick={handleSave}>Save</button>
        </div>
      )}

      {/* STATS CARDS */}
      <div className="stats-row">
        <div className="stat-card">
          <p>Total Benefits</p>
          <h3>{benefits.length}</h3>
        </div>
        <div className="stat-card">
          <p>Track Records</p>
          <h3>{records.length}</h3>
        </div>
        <div className="stat-card">
          <p>Industries</p>
          <h3>{industries.length}</h3>
        </div>
        <div className="stat-card">
          <p>Status</p>
          <h3>Online</h3>
        </div>
      </div>

      {/* CHARTS SIDE BY SIDE */}
      <div
        className="charts-container"
        style={{
          display: "flex",
          gap: "50px",
          marginTop: "30px",
          flexWrap: "wrap",
        }}
      >
        {/* PIE CHART */}
        <div className="chart-box">
          <h4>Dashboard Overview</h4>
          <PieChart width={400} height={300}>
            <Pie
              data={pieData}
              cx="50%"
              cy="50%"
              label
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={COLORS[index % COLORS.length]}
                />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </div>

        {/* LINE CHART */}
        <div className="chart-box">
          <h4>Website Visitors Over Time</h4>
          <LineChart
            width={500}
            height={300}
            data={visitorData}
            margin={{ top: 5, right: 20, left: 20, bottom: 5 }}
          >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#FF8042"
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </div>
      </div>

      {/* BOTTOM GRID */}
      <div className="bottom-grid">
        <div className="card">
          <h4>Benefits</h4>
          <ul>{benefits.map((b, i) => <li key={i}>{b}</li>)}</ul>
        </div>

        <div className="card">
          <h4>Track Records</h4>
          <ul>{records.map((r, i) => <li key={i}>{r}</li>)}</ul>
        </div>

        <div className="card">
          <h4>Industries</h4>
          <ul>{industries.map((i, idx) => <li key={idx}>{i}</li>)}</ul>
        </div>

        {/* EXTRA SECTION */}
        {/* <div className="card">
          <h4>Applications</h4>
          <ul>
            <li>Application 1</li>
            <li>Application 2</li>
            <li>Application 3</li>
          </ul>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardHome;
