import React from "react";
import "./Tasks.css";

export default function Tasks() {
  return (
    <div className="tasks-container">
      {/* Header */}
      <div className="tasks-header">
        <h2>Tasks</h2>
        <p>Welcome back, John Smith</p>
        <button className="new-task-btn">+ New Personal Task</button>
      </div>

      {/* Stats Section */}
      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Tasks</h3>
          <p className="stat-number">5</p>
          <span>All assigned & personal</span>
        </div>
        <div className="stat-card">
          <h3>In Progress</h3>
          <p className="stat-number in-progress">2</p>
          <span>Currently working on</span>
        </div>
        <div className="stat-card">
          <h3>Pending</h3>
          <p className="stat-number pending">2</p>
          <span>To be started</span>
        </div>
        <div className="stat-card">
          <h3>Completed</h3>
          <p className="stat-number completed">0</p>
          <span>Successfully finished</span>
        </div>
      </div>

      {/* Tabs */}
      <div className="tabs">
        <button className="active">All Tasks (5)</button>
        <button>Assigned by Admin (3)</button>
        <button>Personal Tasks (2)</button>
      </div>

      {/* Task Card */}
      <div className="task-card">
        <div className="task-header">
          <h4>Implement User Authentication API</h4>
          <span className="priority high">High</span>
          <span className="status in-progress">In Progress</span>
        </div>
        <p className="task-desc">
          Create REST API endpoints for user login, registration, and password reset functionality.
        </p>
        <p className="task-meta">👤 Assigned by: Sarah Johnson (Project Manager)</p>
        <p className="task-meta">📌 Project: E-commerce Platform</p>

        <div className="task-footer">
          <div>
            <p>📅 Due Date: <strong>1/20/2024</strong></p>
            <p>⏱ Time Spent: <strong>4h 30m</strong></p>
            <p>⏳ Estimated: <strong>8h</strong></p>
            <p>📊 Progress: <strong>60%</strong></p>
          </div>
          <div className="task-actions">
            <button className="timer-btn">▶ Start Timer</button>
            <button className="details-btn">👁 Details</button>
            <select className="status-select">
              <option>In Progress</option>
              <option>Completed</option>
              <option>Pending</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
