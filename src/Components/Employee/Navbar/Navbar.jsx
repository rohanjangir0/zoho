import React from "react";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <h2>Dashboard</h2>
        <p>Welcome back, John Smith</p>
      </div>

      <div className="navbar-center">
        <input type="text" placeholder="Search..." className="search-bar" />
      </div>

      <div className="navbar-right">
        <div className="status">
          <span className="dot"></span>
          <span>Clocked In</span>
        </div>
        <button className="clockout-btn">Clock Out</button>

        <button className="icon-btn">🔔</button>
        <button className="icon-btn">⚙️</button>
      </div>
    </div>
  );
}
