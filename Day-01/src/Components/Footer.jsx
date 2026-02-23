import React from "react";
import { NavLink } from "react-router-dom";
import "./Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="line1">
        <div className="logo">
          {/* Add your logo here */}
        </div>
        <div className="footer-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/Category/Applications">Applications</NavLink>
          <NavLink to="/Category/Technical%20Documents%20&%20Specifications">Technical Documents</NavLink>
          <NavLink to="/Category/Forms%20&%20Policies">Forms & Policies</NavLink>
        </div>
      </div>
      <div className="footer-rights">
        <p>© 2026 Sui Northern Gas Pipeline Ltd. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
