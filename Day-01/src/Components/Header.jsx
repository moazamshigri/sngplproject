import React, { useState } from "react";
import "./styling/Header-style.css";
import { Link } from "react-router-dom";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  return (
    <nav>
      <div className="logo"></div>

      <div className="menu-icon" onClick={() => setMenuOpen(!menuOpen)}>
        {menuOpen ? (
          <i className="fa-solid fa-close"></i>
        ) : (
          <i className="fa-solid fa-bars"></i>
        )}
      </div>

      <ul className={menuOpen ? "open" : ""}>
        <li>
          <Link to="/" onClick={() => setMenuOpen(true)}>
            Home
          </Link>
        </li>

        <li>
          <Link
            to="/Category/Applications"
            onClick={() => setMenuOpen(true)}
          >
            Applications
          </Link>
        </li>

        <li>
          <Link
            to="/Category/Technical%20Documents%20&%20Specifications"
            onClick={() => setMenuOpen(true)}
          >
            Technical Documents
          </Link>
        </li>

        <li>
          <Link
            to="/Category/Forms%20&%20Policies"
            onClick={() => setMenuOpen(true)}
          >
            Forms & Policies
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Header;
