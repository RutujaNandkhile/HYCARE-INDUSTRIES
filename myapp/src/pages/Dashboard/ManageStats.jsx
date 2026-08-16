import { useContext, useState } from "react";
import { PartnershipContext } from "../context/PartnershipContext";

const ManageStats = () => {
  const { stats, setStats } = useContext(PartnershipContext);
  const [value, setValue] = useState("");
  const [label, setLabel] = useState("");

  const addStat = () => {
    if (!value || !label) return;

    setStats([...stats, { id: Date.now(), value, label }]);
    setValue("");
    setLabel("");
  };

  return (
    <div>
      <h2>Manage Track Record</h2>

      <input
        className="form-control mb-2"
        placeholder="Value"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <input
        className="form-control mb-2"
        placeholder="Label"
        value={label}
        onChange={(e) => setLabel(e.target.value)}
      />

      <button className="btn btn-success mb-4" onClick={addStat}>
        Add Stat
      </button>

      {stats.map((item) => (
        <div key={item.id} className="border p-2 mb-2">
          <strong>{item.value}</strong> – {item.label}
        </div>
      ))}
    </div>
  );
};

export default ManageStats;
