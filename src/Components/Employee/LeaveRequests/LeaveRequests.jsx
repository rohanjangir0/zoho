import React, { useState, useEffect } from "react";
import "./LeaveRequests.css";

const LeaveRequests = () => {
  const [requests, setRequests] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [reason, setReason] = useState("");
  const [leaveType, setLeaveType] = useState("Annual");

  // Load leaves safely
  useEffect(() => {
    async function loadLeaves() {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          console.error("No token found, user may not be logged in");
          return;
        }

        const res = await fetch("/api/leaves", {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Check if response is JSON
        const text = await res.text();
        let data = [];
        try { data = JSON.parse(text); } catch { console.error("Invalid JSON response:", text); }

        if (!res.ok) {
          console.error("Failed to load leaves:", data);
          return;
        }

        setRequests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error fetching leaves:", err);
      }
    }
    loadLeaves();
  }, []);

  // Submit leave safely
  const handleSubmit = async () => {
    if (!startDate || !endDate || !reason) return alert("Fill all fields");

    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token, please login");

      const res = await fetch("/api/leaves", {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
        body: JSON.stringify({ leaveType, startDate, endDate, reason }),
      });

      const text = await res.text();
      let data = {};
      try { data = JSON.parse(text); } catch { console.error("Invalid JSON:", text); }

      if (!res.ok) throw new Error(data.error || "Failed to submit leave");

      setRequests(prev => [data, ...prev]);
      setShowForm(false);
      setStartDate(""); setEndDate(""); setReason(""); setLeaveType("Annual");
    } catch (err) {
      alert(err.message);
    }
  };

  // Delete leave safely
  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return alert("No token, please login");

      const res = await fetch(`/api/leaves/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const text = await res.text();
      let data = {};
      try { data = JSON.parse(text); } catch {}

      if (!res.ok) throw new Error(data.error || "Failed to delete leave");

      setRequests(prev => prev.filter(r => r._id !== id));
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="leave-container">
      <h2>Leave Requests</h2>
      <button onClick={() => setShowForm(true)}>+ New Leave Request</button>

      {showForm && (
        <div className="leave-form-modal">
          <div className="leave-form">
            <h3>Request Leave</h3>
            <label>Type:
              <select value={leaveType} onChange={e => setLeaveType(e.target.value)}>
                <option value="Annual">Annual Leave</option>
                <option value="Sick">Sick Leave</option>
                <option value="Personal">Personal Leave</option>
              </select>
            </label>
            <label>From:<input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} /></label>
            <label>To:<input type="date" value={endDate} onChange={e => setEndDate(e.target.value)} /></label>
            <label>Reason:<textarea value={reason} onChange={e => setReason(e.target.value)} /></label>
            <button onClick={handleSubmit}>Submit</button>
            <button onClick={() => setShowForm(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div>
        {requests.map(req => (
          <div key={req._id}>
            <h4>{req.leaveType} ({req.status})</h4>
            <p>
              {req.startDate ? new Date(req.startDate).toLocaleDateString() : "-"} - 
              {req.endDate ? new Date(req.endDate).toLocaleDateString() : "-"}
            </p>
            {req.status === "Pending" && <button onClick={() => handleDelete(req._id)}>Delete</button>}
          </div>
        ))}
      </div>
    </div>
  );
};

export default LeaveRequests;
