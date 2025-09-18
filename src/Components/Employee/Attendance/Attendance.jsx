import React from "react";
import "./Attendance.css";
import { FaPlayCircle, FaStopCircle } from "react-icons/fa";

const Attendance = () => {
  return (
    <div className="attendance-container">
      {/* ===== Header ===== */}
      <h2 className="page-title">Attendance & Time Tracking</h2>
      <p className="subtitle">Track your work hours and manage attendance records.</p>

      {/* ===== Time Clock Section ===== */}
      <div className="time-clock-card">
        <div className="current-time">
          <h1>02:29 PM</h1>
          <p>Current Time</p>
        </div>
        <div className="clock-info">
          <p><strong>02:29 PM</strong> <span>Clock In</span></p>
          <p><strong>7h 45m</strong> <span>Today's Hours</span></p>
          <p className="status">
            Status: <span className="red-dot"></span> Clocked Out
          </p>
        </div>
        <button className="clock-btn">
          <FaPlayCircle size={20}/> Clock In
        </button>
      </div>

      {/* ===== Stats Section ===== */}
      <div className="stats-cards">
        <div className="stat-card">
          <h3>Attendance Rate</h3>
          <p className="big-text">86%</p>
          <span>19/22 days</span>
        </div>
        <div className="stat-card">
          <h3>Total Hours</h3>
          <p className="big-text">165h 30m</p>
          <span>This month</span>
        </div>
        <div className="stat-card">
          <h3>Avg Daily Hours</h3>
          <p className="big-text">8h 42m</p>
          <span>Per working day</span>
        </div>
        <div className="stat-card">
          <h3>Late Days</h3>
          <p className="big-text">1</p>
          <span>This month</span>
        </div>
      </div>

      {/* ===== Attendance History ===== */}
      <h2 className="section-title">Attendance History</h2>
      <table className="attendance-table">
        <thead>
          <tr>
            <th>Date</th>
            <th>Clock In</th>
            <th>Clock Out</th>
            <th>Total Hours</th>
            <th>Break</th>
            <th>Status</th>
            <th>Location</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1/18/2024</td>
            <td>09:15 AM</td>
            <td>06:30 PM</td>
            <td>8h 30m</td>
            <td>45m</td>
            <td><span className="present">Present</span></td>
            <td>Office - New York</td>
          </tr>
          <tr>
            <td>1/17/2024</td>
            <td>09:00 AM</td>
            <td>06:15 PM</td>
            <td>8h 45m</td>
            <td>30m</td>
            <td><span className="present">Present</span></td>
            <td>Remote</td>
          </tr>
          <tr>
            <td>1/16/2024</td>
            <td>09:30 AM</td>
            <td>06:45 PM</td>
            <td>8h 15m</td>
            <td>1h 0m</td>
            <td><span className="late">Late</span></td>
            <td>Office - New York</td>
          </tr>
          <tr>
            <td>1/15/2024</td>
            <td>09:10 AM</td>
            <td>06:20 PM</td>
            <td>8h 25m</td>
            <td>45m</td>
            <td><span className="present">Present</span></td>
            <td>Office - New York</td>
          </tr>
          <tr>
            <td>1/14/2024</td>
            <td>-</td>
            <td>-</td>
            <td>0h 0m</td>
            <td>-</td>
            <td><span className="leave">Leave</span></td>
            <td>-</td>
          </tr>
        </tbody>
      </table>

      {/* ===== Bottom Section ===== */}
      <div className="bottom-section">
        <div className="weekly-overview">
          <h3>Weekly Overview</h3>
          <p>Monday: 8h 30m ✅</p>
          <p>Tuesday: 8h 30m ✅</p>
          <p>Wednesday: 8h 30m ✅</p>
          <p>Thursday: 8h 30m ✅</p>
        </div>
        <div className="break-tracking">
          <h3>Break Tracking</h3>
          <p><strong>Lunch Break:</strong> 12:00 PM - 1:00 PM (1h 0m)</p>
          <p><strong>Coffee Break:</strong> 3:30 PM - 3:45 PM (15m)</p>
        </div>
      </div>
    </div>
  );
};

export default Attendance;
