import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/img/logo.jpeg";
import "./Navbar.css";

const Navbar = () => {
  const [open, setOpen] = useState(false);

  return (
    <>
      {/* ===== TOP INFO BAR ===== */}
      <div className="topbar">
        <div className="top-left"></div>

        <div className="top-info">
  <span>
    📞 
    <a href="tel:7620335231">7620335231</a>, 
    <a href="tel:8605659955">8605659955</a>
  </span>

  <span>
    ✉ 
    <a href="mailto:hycareengineering23@gmail.com">
      hycareengineering23@gmail.com
    </a>
  </span>

  <span>🕒 Mon-Sat: 8am – 7pm</span>
</div>

      </div>

      {/* ===== MAIN NAVBAR ===== */}
      <header className="navbar">
        <div className="nav-wrapper">
          {/* LOGO */}
          <div className="logo-section">
            <img src={logo} alt="logo" className="top-logo" />
            <span className="brand">HYCARE INDUSTRIES</span>
          </div>

          {/* MENU */}
          <nav className={`nav-menu ${open ? "show" : ""}`}>
            <Link to="/" className="active">
              Home
            </Link>
            <Link to="/about">About</Link>
            <Link to="/services">Services</Link>
            <Link to="/application">Application Form</Link>
             {/* Gallery Dropdown */}
  <div className="dropdown">
    <span>Gallery ▼</span>
    <div className="dropdown-content">
      <Link to="/gallery/cnc-strength">CNC STRENGTH</Link>
      <Link to="/gallery/vmc-strength">VMC STRENGTH</Link>
      <Link to="/gallery/inbuild-machinery">INBUILD MACHINERY</Link>
      <Link to="/gallery/jobs">JOB'S</Link>
      <Link to="/gallery/spot-welding-electrodes">SPOT WELDING ELECTRODES</Link>
      <Link to="/gallery/springs-jobs">SPRINGS JOB'S</Link>
    </div>
  </div>
            <Link to="/contact">Contacts</Link>
          </nav>

          {/* RIGHT SIDE */}
          <div className="nav-right">
            <div className="search">🔍</div>

            <Link to="/login" className="quote-btn">
              Login →
            </Link>

            <div className="hamburger" onClick={() => setOpen(!open)}>
              ☰
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Navbar;
