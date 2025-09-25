import React from "react";
import { NavLink } from "react-router-dom";
import "./Sidebar.css";

export default function Sidebar() {
  const navItems = [
    { name: "Dashboard", icon: "dashboard", path: "/employee/dashboard" },
    { name: "Tasks", icon: "check_circle_outline", path: "/employee/tasks" },
    { name: "Attendance", icon: "access_time", path: "/employee/attendance" },
    { name: "Leave Requests", icon: "event_note", path: "/employee/leave-requests" },
    { name: "Payroll", icon: "attach_money", path: "/employee/payroll" },
    { name: "Documents", icon: "folder_open", path: "/employee/documents" },
    { name: "Chat", icon: "chat_bubble_outline", path: "/employee/chat" },
  ];

  return (
    <div className="sidebar">
      <div className="sidebar-header">
        <h2>Employee Portal</h2>
        <p>Dashboard</p>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            className={({ isActive }) => (isActive ? "active" : "")}
          >
            <span className="material-symbols-outlined">{item.icon}</span>
            {item.name}
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn">logout</button>
      </div>
    </div>
  );
}
