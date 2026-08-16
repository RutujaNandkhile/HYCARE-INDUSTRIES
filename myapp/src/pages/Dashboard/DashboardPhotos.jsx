import { useEffect, useState } from "react";
import {
  getPhotos,
  addPhoto,
  updatePhoto,
  deletePhoto,
} from "../../services/photoService";
import "./DashboardPhotos.css";

const categories = [
  "CNC STRENGTH",
  "VMC STRENGTH",
  "INBUILD MACHINERY",
  "JOB'S",
  "SPOT WELDING ELECTRODES",
  "SPRINGS JOB'S",
];

const DashboardPhotos = () => {
  const [photos, setPhotos] = useState([]);
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [file, setFile] = useState(null);
  const [editingId, setEditingId] = useState(null);

  const loadPhotos = async () => {
    const data = await getPhotos();
    setPhotos(data);
  };

  useEffect(() => {
    loadPhotos();
  }, []);

  const submit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", title);
    formData.append("category", category);

    if (file) {
      formData.append("image", file);
    }

    if (editingId) {
      await updatePhoto(editingId, formData);
    } else {
      await addPhoto(formData);
    }

    setTitle("");
    setFile(null);
    setEditingId(null);
    loadPhotos();
  };

  return (
    <div className="photo-dashboard container">
      <div className="photo-dashboard-header">
        <h2>Photo Dashboard</h2>
        <p className="photo-dashboard-subtitle">
          Manage gallery photos across categories
        </p>
      </div>

      <div className="photo-form-card">
        <form onSubmit={submit} className="photo-form">
          <div className="photo-form-row">
            <div className="photo-form-group">
              <label className="photo-form-label">Title</label>
              <input
                value={title}
                placeholder="Enter photo title"
                onChange={(e) => setTitle(e.target.value)}
                className="form-control"
              />
            </div>

            <div className="photo-form-group">
              <label className="photo-form-label">Category</label>
              <select
                className="form-control"
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
            </div>

            <div className="photo-form-group">
              <label className="photo-form-label">Image</label>
              <input
                type="file"
                className="form-control"
                onChange={(e) => setFile(e.target.files[0])}
              />
            </div>
          </div>

          <button className="btn btn-primary photo-submit-btn">
            {editingId ? "Update Photo" : "Add Photo"}
          </button>
        </form>
      </div>

      <div className="photo-table-card">
        <table className="photo-table">
          <thead>
            <tr>
              <th>Photo</th>
              <th>Title</th>
              <th>Category</th>
              <th className="photo-table-action-col">Action</th>
            </tr>
          </thead>

          <tbody>
            {photos.length === 0 && (
              <tr>
                <td colSpan="4" className="photo-table-empty">
                  No photos added yet
                </td>
              </tr>
            )}

            {photos.map((p) => (
              <tr key={p._id}>
                <td>
                  <img
                    src={`http://localhost:5000/uploads/${p.image}`}
                    className="photo-thumb"
                    alt={p.title}
                  />
                </td>
                <td className="photo-title-cell">{p.title}</td>
                <td>
                  <span className="photo-category-badge">{p.category}</span>
                </td>

                <td>
                  <div className="photo-action-buttons">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditingId(p._id)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => deletePhoto(p._id).then(loadPhotos)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default DashboardPhotos;