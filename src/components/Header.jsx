import React from "react";
import { Link, useLocation } from "react-router-dom";
import "./Header.css";

const Header = () => {
  const location = useLocation();

  return (
    <header className="header">
      <h1 className="header-title">Employee Portal</h1>
      <nav className="nav-links">
        <Link
          to="/"
          className={`nav-link ${location.pathname === "/" ? "active" : ""}`}
        >
          🏠 Employee List
        </Link>

        <Link
          to="/add"
          className={`nav-link ${location.pathname === "/add" ? "active" : ""}`}
        >
          ➕ Add Employee
        </Link>
      </nav>
    </header>
  );
};

export default Header;
