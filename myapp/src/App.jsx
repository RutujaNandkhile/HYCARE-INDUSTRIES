import { Routes, Route, Navigate, useLocation } from "react-router-dom";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import ApplicationForm from "./components/ApplicationForm";
import Contact from "./components/Contact";

import Login from "./pages/Login/Login";
import Signup from "./pages/Signup/Signup";
import Logout from "./pages/Login/Logout";

import Dashboard from "./pages/Dashboard/Dashboard";
import DashboardHome from "./pages/Dashboard/DashboardHome";
import DashboardPhotos from "./pages/Dashboard/DashboardPhotos";
import Users from "./pages/Dashboard/Users";
import ApplicationList from "./pages/Dashboard/ApplicationList";
import SliderAdmin from "./pages/Dashboard/SliderAdmin";

import { DashboardProvider } from "./context/DashboardContext";
import GalleryCategoryPage from "./pages/Dashboard/GalleryCategoryPage";



// 🔐 Private Route
const PrivateRoute = ({ children }) => {
  const isLogin = localStorage.getItem("isLogin");
  return isLogin ? children : <Navigate to="/login" />;
};

function App() {
  const location = useLocation();

  const hideLayoutRoutes = ["/login", "/signup", "/dashboard"];
  const hideLayout = hideLayoutRoutes.some((route) =>
    location.pathname.startsWith(route)
  );

  return (
    <DashboardProvider>
      {!hideLayout && <Navbar />}

      <Routes>
        {/* Public */}
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/services" element={<Services />} />
        <Route path="/application" element={<ApplicationForm />} />
          <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/logout" element={<Logout />} />
         <Route path="/gallery/:categorySlug" element={<GalleryCategoryPage />} />

        {/* Dashboard (Protected) */}
        <Route
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        >
          <Route index element={<DashboardHome />} />
          <Route path="users" element={<Users />} />
          <Route path="photos" element={<DashboardPhotos />} />
          <Route path="slider" element={<SliderAdmin />} />
          <Route path="application-list" element={<ApplicationList />} />

          {/* ✅ FIX: remove slash */}
          {/* <Route path="gallery" element={<GalleryPage />} /> */}
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!hideLayout && <Footer />}
    </DashboardProvider>
  );
}

export default App;
