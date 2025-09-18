import React, { useState, useEffect } from "react";
import "./AdminLeaveApprovals.css";

const AdminLeaveApprovals = () => {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [filter, setFilter] = useState("All");

  useEffect(() => {
    async function loadLeaves() {
      try {
        const res = await fetch("/api/admin/leaves", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        const data = await res.json();
        setLeaveRequests(data);
      } catch (err) { console.error(err); }
    }
    loadLeaves();
  }, []);

  const handleDecision = async (id, status) => {
    try {
      const res = await fetch(`/api/admin/leaves/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json", Authorization: `Bearer ${localStorage.getItem("token")}` },
        body: JSON.stringify({ status, adminRemark: "OK" })
      });
      const updated = await res.json();
      setLeaveRequests(prev => prev.map(r => r._id === updated._id ? updated : r));
    } catch (err) { console.error(err); }
  };

  const filteredRequests = leaveRequests.filter(req => filter==="All"?true:req.status===filter);

  return (
    <div>
      <h2>Leave Approvals</h2>
      <div>
        {["All","Pending","Approved","Rejected"].map(f => (
          <button key={f} className={filter===f?"active":""} onClick={()=>setFilter(f)}>
            {f} ({leaveRequests.filter(r=>f==="All"?true:r.status===f).length})
          </button>
        ))}
      </div>

      <div>
        {filteredRequests.map(req => (
          <div key={req._id}>
            <h4>{req.name} ({req.employeeId})</h4>
            <p>{req.leaveType} | {req.status}</p>
            <p>{new Date(req.startDate).toLocaleDateString()} - {new Date(req.endDate).toLocaleDateString()}</p>
            {req.status==="Pending" && (
              <>
                <button onClick={()=>handleDecision(req._id,"Approved")}>Approve</button>
                <button onClick={()=>handleDecision(req._id,"Rejected")}>Reject</button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminLeaveApprovals;
