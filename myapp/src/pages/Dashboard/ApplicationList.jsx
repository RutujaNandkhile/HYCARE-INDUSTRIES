import { useEffect, useState } from "react";

const ApplicationList = () => {
  const [applications, setApplications] = useState([]);
  const [editIndex, setEditIndex] = useState(null);
  const [editData, setEditData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    course: "",
    experience: "",
    resume: ""
  });

  // Load data from localStorage
  useEffect(() => {
    const data = JSON.parse(localStorage.getItem("applications")) || [];
    setApplications(data);
  }, []);

  // DELETE
  const handleDelete = (index) => {
    if (!window.confirm("Are you sure you want to delete this application?"))
      return;

    const updated = applications.filter((_, i) => i !== index);
    localStorage.setItem("applications", JSON.stringify(updated));
    setApplications(updated);
  };

  // EDIT
  const handleEdit = (index) => {
    setEditIndex(index);
    setEditData(applications[index]);
  };

  // INPUT CHANGE
  const handleChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // UPDATE
  const handleUpdate = () => {
    const updated = [...applications];
    updated[editIndex] = editData;

    localStorage.setItem("applications", JSON.stringify(updated));
    setApplications(updated);
    setEditIndex(null);
  };

  return (
    <>
    <div className="container mt-4">
      <div className="card p-4 shadow">
        <h4 className="mb-3">Application List</h4>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Address</th>
              <th>Course</th>
              <th>Experience</th>
              <th>Resume</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>
            {applications.length === 0 ? (
              <tr>
                <td colSpan="9" className="text-center">
                  No Applications Found
                </td>
              </tr>
            ) : (
              applications.map((app, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>

                  {editIndex === index ? (
                    <>
                      {["name", "email", "phone", "address", "course", "experience"].map(
                        (field) => (
                          <td key={field}>
                            <input
                              name={field}
                              value={editData[field]}
                              onChange={handleChange}
                              className="form-control"
                            />
                          </td>
                        )
                      )}

                      <td>{editData.resume || "N/A"}</td>

                      <td>
                        <button
                          className="btn btn-success btn-sm me-2"
                          onClick={handleUpdate}
                        >
                          Save
                        </button>
                        <button
                          className="btn btn-secondary btn-sm"
                          onClick={() => setEditIndex(null)}
                        >
                          Cancel
                        </button>
                      </td>
                    </>
                  ) : (
                    <>
                      <td>{app.name}</td>
                      <td>{app.email}</td>
                      <td>{app.phone}</td>
                      <td>{app.address}</td>
                      <td>{app.course}</td>
                      <td>{app.experience} Years</td>
                      <td>
                        {app.resume ? (
                          <span className="badge bg-info text-dark">
                            {app.resume}
                          </span>
                        ) : (
                          "N/A"
                        )}
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(index)}
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(index)}
                        >
                          Delete
                        </button>
                      </td>
                    </>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
        </div>

        
      </div>
    </div>
    </>
  );
};

export default ApplicationList;
