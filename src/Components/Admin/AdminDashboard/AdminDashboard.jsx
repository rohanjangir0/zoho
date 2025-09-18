import React from "react";
import "./AdminDashboard.css";

export default function AdminDashboard() {
  return (
    <div className="dashboard-container">
      <div className="welcome-section">
        <h1>Welcome back, Sarah Johnson! <span className="wave">👋</span></h1>
        <p>Here's what's happening in your organization today.</p>
        <button className="new-announcement">+ New Announcement</button>
      </div>

      <div className="summary-cards">
        <div className="card">
          <h3>Total Employees</h3>
          <p>245</p>
          <span className="subtext">+12 this month</span>
        </div>
        <div className="card">
          <h3>Pending Tasks</h3>
          <p>47</p>
          <span className="subtext">18 urgent</span>
        </div>
        <div className="card">
          <h3>Leave Requests</h3>
          <p>8</p>
          <span className="subtext">3 awaiting approval</span>
        </div>
        <div className="card">
          <h3>Avg Productivity</h3>
          <p>89.2%</p>
          <span className="subtext">+2.1% from last week</span>
        </div>
      </div>

      <div className="actions-section">
        <div className="urgent-actions">
          <h3>⚠️ Urgent Actions Required <span className="pending-count">4 pending</span></h3>
          <div className="action-item high">
            <h4>Leave Request - Sarah Johnson</h4>
            <p>Annual leave from Feb 15-19, 2024</p>
            <span className="time">2 hours ago</span>
            <button>Review</button>
          </div>
          <div className="action-item medium">
            <h4>New Employee Onboarding</h4>
            <p>Alex Thompson - Software Engineer</p>
            <span className="time">4 hours ago</span>
            <button>Review</button>
          </div>
          <div className="action-item high">
            <h4>Performance Review Due</h4>
            <p>Q1 reviews for 15 employees</p>
            <button>Review</button>
          </div>
        </div>

        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button>Add New Employee</button>
          <button>Assign Task</button>
          <button>Review Leave Requests</button>
          <button>Send Announcement</button>
          <button>Generate Report</button>
        </div>
      </div>
    </div>
  );
}
