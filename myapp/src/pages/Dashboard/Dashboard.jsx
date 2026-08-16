import { Outlet, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("currentUser");

    if (!storedUser) {
      navigate("/login");
    } else {
      setUser(JSON.parse(storedUser));
    }
  }, [navigate]);

  if (!user) return null;

  return (
    <div className="d-flex">

      {/* SIDEBAR */}
      <div
        className="bg-dark text-white vh-100 d-flex flex-column p-3"
        style={{ width: "250px" }}
      >
        <h4 className="text-center mb-4">{user.name}</h4>

        <button
          className="btn btn-dark w-100 mb-2"
          onClick={() => navigate("/dashboard")}
        >
          Dashboard
        </button>

        <button
          className="btn btn-dark w-100 mb-2"
          onClick={() => navigate("/dashboard/users")}
        >
          Users
        </button>

        <button
          className="btn btn-dark w-100 mb-2"
          onClick={() => navigate("/dashboard/photos")}
        >
          Photos
        </button>

        <button
          className="btn btn-dark w-100 mb-2"
          onClick={() => navigate("/dashboard/slider")}
        >
          Home Slider
        </button>

        <button
          className="btn btn-dark w-100 mb-2"
          onClick={() => navigate("/dashboard/application-list")}
        >
          Application List
        </button>

        {/* ⭐ Gallery button */}
        {/* <button
          className="btn btn-dark w-100 mb-2"
          onClick={() => navigate("/dashboard/gallery")}
        >
          Gallery View
        </button> */}

        {/* Logout bottom */}
        <div className="mt-auto">
          <hr />
          <button
            className="btn btn-danger w-100"
            onClick={() => {
              localStorage.removeItem("currentUser");
              localStorage.removeItem("isLogin");
              navigate("/login");
            }}
          >
            Logout
          </button>
        </div>
      </div>

      {/* CONTENT */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>
    </div>
  );
};

export default Dashboard;
