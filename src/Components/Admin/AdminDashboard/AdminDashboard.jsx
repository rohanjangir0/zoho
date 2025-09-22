import React, { useEffect, useState } from "react";
import "./AdminDashboard.css";
import axios from "axios";

export default function AdminDashboard() {
  const [announcements, setAnnouncements] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");

  // Fetch announcements from backend
  useEffect(() => {
    axios.get("http://localhost:5000/api/announcements")
      .then(res => setAnnouncements(res.data))
      .catch(err => console.error(err));
  }, []);

  // Add new announcement
  const addAnnouncement = async (e) => {
    e.preventDefault();
    if (!subject || !description) return;

    try {
      const res = await axios.post("http://localhost:5000/api/announcements", {
        subject,
        description,
      });
      // prepend the new announcement
      setAnnouncements([res.data, ...announcements]);
      setSubject("");
      setDescription("");
      setShowModal(false);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="dashboard-container">
      {/* Welcome Section */}
      <div className="welcome-section">
        <div className="welcome-text">
          <h1>Welcome back, Sarah Johnson! <span className="wave">👋</span></h1>
          <p>Here's a quick overview of your organization today.</p>
        </div>
        <button className="btn-announcement" onClick={() => setShowModal(true)}>+ New Announcement</button>
      </div>

      {/* Summary Cards */}
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

      {/* Actions Section */}
      <div className="actions-section">
        {/* Admin Announcements */}
        <div className="urgent-actions">
          <h3>📢 Admin Announcements</h3>
          <div className="announcement-list">
            {announcements.map((a) => (
              <div key={a._id} className="announcement-item">
                <h4>{a.subject}</h4>
                <p>{a.description}</p>
                <span className="time">{new Date(a.createdAt).toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="quick-actions">
          <h3>Quick Actions</h3>
          <button className="btn-quick">Add New Employee</button>
          <button className="btn-quick">Assign Task</button>
          <button className="btn-quick">Review Leave Requests</button>
          <button className="btn-quick">Send Announcement</button>
          <button className="btn-quick">Generate Report</button>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-backdrop">
          <div className="modal">
            <h3>Add New Announcement</h3>
            <form onSubmit={addAnnouncement}>
              <input
                type="text"
                placeholder="Subject"
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                required
              />
              <textarea
                placeholder="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                required
              />
              <div className="modal-actions">
                <button type="submit">Add</button>
                <button type="button" onClick={() => setShowModal(false)}>Cancel</button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
