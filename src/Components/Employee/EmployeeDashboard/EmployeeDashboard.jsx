import React, { useState, useEffect } from "react";
import "./EmployeeDashboard.css";
import axios from "axios";

export default function EmployeeDashboard() {
  const [isClockedIn, setIsClockedIn] = useState(false);
  const [clockInTime, setClockInTime] = useState(null);
  const [workedHours, setWorkedHours] = useState("0h 0m");
  const [announcements, setAnnouncements] = useState([]);

  const employeeName = localStorage.getItem("name") || "Employee";
  const employeeId = localStorage.getItem("employeeId") || "";

  // Fetch announcements from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/announcements")
      .then((res) => setAnnouncements(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Update worked hours live if clocked in
  useEffect(() => {
    let timer;
    if (isClockedIn && clockInTime) {
      timer = setInterval(() => {
        const diff = Date.now() - clockInTime;
        const hours = Math.floor(diff / (1000 * 60 * 60));
        const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
        setWorkedHours(`${hours}h ${minutes}m`);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [isClockedIn, clockInTime]);

  const handleClockInOut = () => {
    if (isClockedIn) {
      setIsClockedIn(false);
    } else {
      setIsClockedIn(true);
      setClockInTime(Date.now());
    }
  };

  return (
    <div className="dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <h2>Dashboard</h2>
        <p>
          Welcome back, {employeeName} ({employeeId})
        </p>
        <div className="status-box">
          <span className={isClockedIn ? "status green" : "status red"}>
            {isClockedIn ? "Clocked In" : "Clocked Out"}
          </span>
          <button
            className={isClockedIn ? "btn-red" : "btn-green"}
            onClick={handleClockInOut}
          >
            {isClockedIn ? "Clock Out" : "Clock In"}
          </button>
        </div>
      </div>

      {/* Stats Row */}
      <div className="stats-row">
        <div className="stat-card">
          <h3>Tasks Completed</h3>
          <p className="stat-value">24</p>
          <span className="stat-sub">+3 today</span>
        </div>
        <div className="stat-card">
          <h3>Hours Worked</h3>
          <p className="stat-value">{workedHours}</p>
          <span className="stat-sub">Today</span>
        </div>
        <div className="stat-card">
          <h3>Pending Tasks</h3>
          <p className="stat-value">8</p>
          <span className="stat-sub">2 urgent</span>
        </div>
        <div className="stat-card">
          <h3>Leave Balance</h3>
          <p className="stat-value">12 days</p>
          <span className="stat-sub">Available</span>
        </div>
      </div>

      <div className="dashboard-content">
        {/* Left Column */}
        <div className="left-col">
          {/* Admin Announcements */}
          <div className="announcements">
            <h3>Admin Announcements</h3>
            {announcements.length === 0 ? (
              <p>No announcements yet.</p>
            ) : (
              announcements.map((a, idx) => (
                <div key={idx} className="announcement">
                  <h4>
                    {a.subject}{" "}
                    <span className={`badge ${a.priority || "medium"}`}>
                      {a.priority || "Medium"}
                    </span>
                  </h4>
                  <p>{a.description}</p>
                  <span className="meta">
                    {a.author || "Admin"} •{" "}
                    {new Date(a.createdAt).toLocaleString()}
                  </span>
                </div>
              ))
            )}
          </div>

          {/* Recent Activities */}
          <div className="recent-activities">
            <h3>Recent Activities</h3>
            <ul>
              <li>✅ Completed "API Integration Testing"</li>
              <li>🕒 Clocked in at 9:15 AM</li>
              <li>📅 Submitted leave request</li>
              <li>💰 Uploaded expense report</li>
            </ul>
          </div>
        </div>

        {/* Right Column */}
        <div className="right-col">
          <div className="quick-actions">
            <h3>Quick Actions</h3>
            <button>Create New Task</button>
            <button>Request Leave</button>
            <button>Submit Expense</button>
            <button>Team Chat</button>
            <button>View Team</button>
          </div>

          <div className="upcoming-tasks">
            <h3>Upcoming Tasks</h3>
            <div className="task">
              <p>Code Review - Authentication Module</p>
              <span className="badge high">High</span>
            </div>
            <div className="task">
              <p>Weekly Team Standup</p>
              <span className="badge medium">Medium</span>
            </div>
            <div className="task">
              <p>Database Optimization</p>
              <span className="badge low">Low</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
