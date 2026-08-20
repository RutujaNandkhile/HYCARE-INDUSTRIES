import React, { useEffect, useState } from "react";

import {
  getUsers,
  deleteUser,
  updateUser,
} from "../../services/userService";

import "./Users.css";

const Users = () => {
  const [users, setUsers] = useState([]);
  const [editUser, setEditUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      setLoading(true);
      setError("");

      const res = await getUsers();

      console.log("Users:", res.data);

      setUsers(Array.isArray(res.data) ? res.data : []);
    } catch (error) {
      console.error("Get Users Error:", error);

      setError(
        error.response?.data?.message ||
          "Unable to load users"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) {
      return;
    }

    try {
      await deleteUser(id);

      alert("User deleted successfully");

      loadUsers();
    } catch (error) {
      console.error("Delete Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to delete user"
      );
    }
  };

  const handleUpdate = async () => {
    try {
      await updateUser(editUser._id, {
        name: editUser.name,
        email: editUser.email,
      });

      alert("User updated successfully");

      setEditUser(null);

      loadUsers();
    } catch (error) {
      console.error("Update Error:", error);

      alert(
        error.response?.data?.message ||
          "Unable to update user"
      );
    }
  };

  return (
    <div className="container mt-4">

      <div className="d-flex justify-content-between align-items-center mb-4">
        <h3>User Dashboard</h3>

        <button
          className="btn btn-primary"
          onClick={loadUsers}
        >
          Refresh
        </button>
      </div>

      {error && (
        <div className="alert alert-danger">
          {error}
        </div>
      )}

      {loading ? (
        <div className="text-center py-4">
          <h5>Loading users...</h5>
        </div>
      ) : (
        <>
          {editUser && (
            <div className="card p-3 mb-4">

              <h5>Edit User</h5>

              <input
                className="form-control mb-2"
                type="text"
                value={editUser.name || ""}
                placeholder="Name"
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    name: e.target.value,
                  })
                }
              />

              <input
                className="form-control mb-3"
                type="email"
                value={editUser.email || ""}
                placeholder="Email"
                onChange={(e) =>
                  setEditUser({
                    ...editUser,
                    email: e.target.value,
                  })
                }
              />

              <div>
                <button
                  className="btn btn-success me-2"
                  onClick={handleUpdate}
                >
                  Update
                </button>

                <button
                  className="btn btn-secondary"
                  onClick={() => setEditUser(null)}
                >
                  Cancel
                </button>
              </div>

            </div>
          )}

          <div className="table-responsive">

            <table className="table table-bordered table-striped">

              <thead>
                <tr>
                  <th>#</th>
                  <th>User ID</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Created</th>
                  <th>Action</th>
                </tr>
              </thead>

              <tbody>

                {users.length === 0 ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center"
                    >
                      No users found
                    </td>
                  </tr>
                ) : (
                  users.map((user, index) => (
                    <tr key={user._id}>

                      <td>{index + 1}</td>

                      <td>{user._id}</td>

                      <td>{user.name}</td>

                      <td>{user.email}</td>

                      <td>
                        {user.createdAt
                          ? new Date(
                              user.createdAt
                            ).toLocaleDateString()
                          : "-"}
                      </td>

                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() =>
                            setEditUser(user)
                          }
                        >
                          Edit
                        </button>

                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() =>
                            handleDelete(user._id)
                          }
                        >
                          Delete
                        </button>
                      </td>

                    </tr>
                  ))
                )}

              </tbody>

            </table>

          </div>
        </>
      )}

    </div>
  );
};

export default Users;