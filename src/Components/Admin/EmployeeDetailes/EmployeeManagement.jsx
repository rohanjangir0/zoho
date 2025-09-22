import React, { useState, useEffect } from "react";
import axios from "axios";
import "./EmployeeManagement.css";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    department: "",
  });

  // Load employees from backend
  useEffect(() => {
    axios
      .get("http://localhost:5000/api/employees")
      .then((res) => setEmployees(res.data))
      .catch((err) => console.error(err));
  }, []);

  // Save employee
  const handleSave = async () => {
    try {
      const res = await axios.post(
        "http://localhost:5000/api/employees/add",
        formData
      );

      // Add new employee with password to list
      setEmployees([...employees, { ...res.data.employee, password: res.data.rawPassword }]);
      setFormData({ name: "", email: "", phone: "", department: "" });
      setShowModal(false);
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add employee");
    }
  };

  // Copy text to clipboard
  const copyToClipboard = (text) => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    alert("Copied to clipboard!");
  };

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      <p>Manage your team members and their information.</p>

      {/* Metrics */}
      <div className="metrics-container">
        <div className="metrics-card">
          Total Employees <h2>{employees.length}</h2>
        </div>
        <div className="metrics-card">
          Active <h2>{employees.filter((e) => e.status === "Active").length}</h2>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <button onClick={() => setShowModal(true)} className="add-btn">
          + Add Employee
        </button>
      </div>

      {/* Directory */}
      <div className="employee-directory">
        {employees.map((emp) => (
          <div key={emp._id} className="employee-card">
            <h3>{emp.name}</h3>
            <p>{emp.department}</p>
            <p>
              {emp.email} | {emp.phone}
            </p>
            <p>
              <strong>ID:</strong> {emp.employeeId}
            </p>
            <p>
              <strong>Password:</strong> {emp.password || "N/A"}{" "}
              <button onClick={() => copyToClipboard(emp.password)}>Copy</button>
            </p>
            <p>
              <strong>Status:</strong> {emp.status}
            </p>
          </div>
        ))}
      </div>

      {/* Modal for adding employee */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h2>Add Employee</h2>
            <input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) =>
                setFormData({ ...formData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Phone"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
            />
            <input
              type="text"
              placeholder="Department"
              value={formData.department}
              onChange={(e) =>
                setFormData({ ...formData, department: e.target.value })
              }
            />
            <div className="modal-actions">
              <button onClick={handleSave} className="save-btn">
                Save
              </button>
              <button onClick={() => setShowModal(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
