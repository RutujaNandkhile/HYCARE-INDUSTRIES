import { useEffect, useState } from "react";
import sliderStore from "../../store/sliderStore";
import "./SliderAdmin.css";

const SliderAdmin = () => {
  const [sliders, setSliders] = useState([]);
  const [title, setTitle] = useState("");
  const [image, setImage] = useState("");
  const [editId, setEditId] = useState(null);

  // Load sliders
  useEffect(() => {
    return sliderStore.subscribe(setSliders);
  }, []);

  // Handle image upload
  const handleImage = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setImage(reader.result);
    reader.readAsDataURL(file);
  };

  // Add or Update slider
  const handleSubmit = () => {
    if (!title || !image) {
      alert("Title & Image required");
      return;
    }

    if (editId) {
      sliderStore.update(editId, { title, image });
    } else {
      sliderStore.add({ title, image });
    }

    // Reset form
    setTitle("");
    setImage("");
    setEditId(null);
  };

  // Edit slider
  const handleEdit = (s) => {
    setTitle(s.title);
    setImage(s.image);
    setEditId(s.id);
  };

  // Delete slider
  const handleDelete = (id) => {
    if (window.confirm("Delete this slider?")) {
      sliderStore.delete(id);
    }
  };

  return (
    <div className="slider-admin">
      <h1>Slider Manager</h1>

      <div className="slider-form">
        <input
          type="text"
          placeholder="Slider title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <input type="file" accept="image/*" onChange={handleImage} />

        {image && <img src={image} alt="preview" className="preview" />}

        <button onClick={handleSubmit}>
          {editId ? "Update Slider" : "Add Slider"}
        </button>
      </div>

      <div className="slider-list">
        {sliders.map((s, i) => (
          <div className="slider-row" key={s.id}>
            <span>{i + 1}</span>
            <img src={s.image} alt={s.title} />
            <h3>{s.title}</h3>

            <div className="actions">
              <button onClick={() => handleEdit(s)}>Edit</button>
              <button className="danger" onClick={() => handleDelete(s.id)}>
                Delete
              </button>
            </div>
          </div>
        ))}

        {sliders.length === 0 && <p>No sliders created</p>}
      </div>
    </div>
  );
};

export default SliderAdmin;