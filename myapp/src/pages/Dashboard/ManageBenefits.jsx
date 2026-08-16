import { useContext, useState } from "react";
import { PartnershipContext } from "../context/PartnershipContext";

const ManageBenefits = () => {
  const { benefits, setBenefits } = useContext(PartnershipContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const addBenefit = () => {
    if (!title || !desc) return;

    setBenefits([
      ...benefits,
      {
        id: Date.now(),
        icon: "⭐",
        title,
        desc,
      },
    ]);

    setTitle("");
    setDesc("");
  };

  return (
    <div>
      <h2>Manage Benefits</h2>

      <input
        className="form-control mb-2"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <textarea
        className="form-control mb-2"
        placeholder="Description"
        value={desc}
        onChange={(e) => setDesc(e.target.value)}
      />

      <button className="btn btn-primary mb-4" onClick={addBenefit}>
        Add Benefit
      </button>

      {benefits.map((item) => (
        <div key={item.id} className="border p-2 mb-2">
          <strong>{item.title}</strong>
          <p>{item.desc}</p>
        </div>
      ))}
    </div>
  );
};

export default ManageBenefits;
