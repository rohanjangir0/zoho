import React, { useState, useEffect } from "react";
import "./AdminLeaveApprovals.css";

const AdminLeaveApprovals = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("All");
  const [loading, setLoading] = useState(true);  // new
  const [error, setError] = useState("");        // new

  useEffect(() => {
    async function loadLeaves() {
      try {
        const token = localStorage.getItem("token");
        if (!token) throw new Error("No token found");

        const res = await fetch("/api/admin/leaves", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const text = await res.text();
        let data = [];
        try { data = JSON.parse(text); } catch { console.error("Invalid JSON:", text); }

        if (!res.ok) throw new Error(data.error || "Failed to fetch leaves");

        setLeaveRequests(Array.isArray(data) ? data : []);
      } catch (err) {
        console.error("Error loading leaves:", err.message);
        setError(err.message);
        setLeaveRequests([]); // fallback
      } finally {
        setLoading(false);
      }
    }
    loadLeaves();
  }, []);

  const handleDecision = async (id, status) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) throw new Error("No token found");

      const res = await fetch(`/api/admin/leaves/${id}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ status, adminRemark: "OK" }),
      });

      const text = await res.text();
      let updated = {};
      try { updated = JSON.parse(text); } catch { console.error("Invalid JSON:", text); }

      if (!res.ok) throw new Error(updated.error || "Failed to update leave");

      setLeaveRequests(prev =>
        prev.map(r => r._id === updated._id ? updated : r)
      );
    } catch (err) {
      console.error("Error updating leave:", err.message);
    }
  };

  const filteredRequests = leaveRequests.filter(
    req => filter === "All" ? true : req.status === filter
  );

  if (loading) return <div className="leave-approvals-container"><p>Loading leave requests...</p></div>;
  if (error) return <div className="leave-approvals-container"><p style={{color:"red"}}>{error}</p></div>;

  return (
    <div className="leave-approvals-container">
      <h2>Leave Approvals</h2>

      <div className="filter-buttons">
        {["All","Pending","Approved","Rejected"].map(f => (
          <button
            key={f}
            className={filter===f?"active":""}
            onClick={()=>setFilter(f)}
          >
            {f} ({leaveRequests.filter(r=>f==="All"?true:r.status===f).length})
          </button>
        ))}
      </div>

      <div className="leave-requests-list">
        {filteredRequests.length === 0 ? (
          <p>No leave requests found.</p>
        ) : (
          filteredRequests.map(req => (
            <div className="leave-request-card" key={req._id}>
              <div className="leave-header">
                <div className="employee-info">
                  <div className="avatar">{req.name[0]}</div>
                  <h4>{req.name} ({req.employeeId})</h4>
                </div>
                <div className={`status ${req.status.toLowerCase()}`}>{req.status}</div>
              </div>

              <div className="leave-details">
                <p>{req.leaveType}</p>
                <p>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</p>
              </div>

              {req.status==="Pending" && (
                <div className="leave-actions">
                  <button className="approve" onClick={()=>handleDecision(req._id,"Approved")}>Approve</button>
                  <button className="reject" onClick={()=>handleDecision(req._id,"Rejected")}>Reject</button>
                </div>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default AdminLeaveApprovals;
