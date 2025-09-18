import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Employee Portal</h2>
        <p>Personal Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink
          to="/employee/dashboard"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>📊</span> Dashboard
        </NavLink>

        <NavLink
          to="/employee/tasks"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>✅</span> Tasks
        </NavLink>

        <NavLink
          to="/employee/attendance"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>⏰</span> Attendance
        </NavLink>

        <NavLink
          to="/employee/leave-requests"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>📅</span> Leave Requests
        </NavLink>

        <NavLink
          to="/employee/payroll"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>💲</span> Payroll
        </NavLink>

        <NavLink
          to="/employee/documents"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>📂</span> Documents
        </NavLink>

        <NavLink
          to="/employee/chat"
          className={({ isActive }) => (isActive ? "active" : "")}
        >
          <span>💬</span> Chat
        </NavLink>
      </nav>

      <div className="sidebar-footer">
        <div className="user-info">
          <div className="user-avatar">JS</div>
          <div>
            <h4>John Smith</h4>
            <p>Senior Developer</p>
            <p>ID: EMP-001</p>
          </div>
        </div>
        <button className="logout-btn">⏻ Logout</button>
      </div>
    </div>
  );
}
