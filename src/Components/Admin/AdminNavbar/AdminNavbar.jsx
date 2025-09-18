import React from "react";
import "./AdminNavbar.css";

export default function AdminNavbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Dashboard</h2>
        <p>Admin Management Portal</p>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="navbar-right">
        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
      </div>
    </div>
  );
}
