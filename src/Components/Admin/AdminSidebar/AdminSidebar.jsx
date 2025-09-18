import React from "react";
import { NavLink } from "react-router-dom";
import "./AdminSidebar.css";

export default function AdminSidebar() {
  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Employee Portal</h2>
        <p>Personal Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        <NavLink to="dashboard" className={({ isActive }) => isActive ? "active" : ""}>
          <span>📊</span> Dashboard
        </NavLink>
        <NavLink to="tasks" className={({ isActive }) => isActive ? "active" : ""}>
          <span>✅</span> Employee Management
        </NavLink>
        <NavLink to="attendance" className={({ isActive }) => isActive ? "active" : ""}>
          <span>⏰</span> Task Management
        </NavLink>
        <NavLink to="/admin/leave-approvals" className={({ isActive }) => (isActive ? "active" : "")}>
          📅 Leave Approvals
        </NavLink>
        <NavLink to="payroll" className={({ isActive }) => isActive ? "active" : ""}>
          <span>💲</span> Payroll
        </NavLink>
        <NavLink to="documents" className={({ isActive }) => isActive ? "active" : ""}>
          <span>📂</span> Documents
        </NavLink>
        <NavLink to="chat" className={({ isActive }) => isActive ? "active" : ""}>
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
