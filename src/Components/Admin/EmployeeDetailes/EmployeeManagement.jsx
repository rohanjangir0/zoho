import React, { useState } from "react";
import "./EmployeeManagement.css";

export default function EmployeeManagement() {
  const [employees, setEmployees] = useState([
    {
      id: "EMP-001",
      name: "John Smith",
      role: "Senior Developer",
      department: "Engineering",
      email: "john.smith@company.com",
      phone: "+1 (555) 123-4567",
      joinDate: "2023-01-15",
      performance: 92,
      attendance: 98,
      status: "Active",
      password: "abc12345",
    },
  ]);

  const [showModal, setShowModal] = useState(false);
  const [editEmployee, setEditEmployee] = useState(null);
  const [search, setSearch] = useState("");

  // Generate unique ID + random password
  const generateId = () => "EMP-" + Math.floor(1000 + Math.random() * 9000);
  const generatePassword = () => Math.random().toString(36).slice(-8);

  // Add or Update Employee
  const handleSaveEmployee = (employee) => {
    if (editEmployee) {
      // Editing existing employee
      setEmployees(
        employees.map((emp) => (emp.id === employee.id ? employee : emp))
      );
      setEditEmployee(null);
    } else {
      // Adding new employee
      setEmployees([
        ...employees,
        {
          ...employee,
          id: generateId(),
          joinDate: new Date().toISOString().split("T")[0],
          performance: 85,
          attendance: 95,
          password: generatePassword(),
        },
      ]);
    }
    setShowModal(false);
  };

  // Delete employee
  const handleDelete = (id) => {
    setEmployees(employees.filter((emp) => emp.id !== id));
  };

  // Filter employees for search
  const filteredEmployees = employees.filter(
    (emp) =>
      emp.name.toLowerCase().includes(search.toLowerCase()) ||
      emp.role.toLowerCase().includes(search.toLowerCase()) ||
      emp.department.toLowerCase().includes(search.toLowerCase())
  );

  // Modal form
  const EmployeeModal = ({ onClose, onSave, employee }) => {
    const [formData, setFormData] = useState(
      employee || {
        name: "",
        role: "",
        department: "",
        email: "",
        phone: "",
        status: "Active",
      }
    );

    const handleSubmit = () => {
      onSave(formData);
    };

    return (
      <div className="modal-overlay">
        <div className="modal">
          <h2>{employee ? "Edit Employee" : "Add Employee"}</h2>
          <input
            type="text"
            placeholder="Full Name"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
          />
          <input
            type="text"
            placeholder="Role"
            value={formData.role}
            onChange={(e) =>
              setFormData({ ...formData, role: e.target.value })
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

          <div className="modal-actions">
            <button onClick={handleSubmit} className="save-btn">
              Save
            </button>
            <button onClick={onClose} className="cancel-btn">
              Cancel
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="employee-management">
      <h1>Employee Management</h1>
      <p className="subtitle">
        Manage your team members and their information.
      </p>

      {/* Metrics Section */}
      <div className="metrics-container">
        <div className="metrics-card">
          <h3>Total Employees</h3>
          <p className="value">{employees.length}</p>
        </div>
        <div className="metrics-card">
          <h3>Active</h3>
          <p className="value">
            {employees.filter((e) => e.status === "Active").length}
          </p>
        </div>
        <div className="metrics-card">
          <h3>On Leave</h3>
          <p className="value">
            {employees.filter((e) => e.status === "On Leave").length}
          </p>
        </div>
      </div>

      {/* Toolbar */}
      <div className="toolbar">
        <input
          type="text"
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button
          className="add-btn"
          onClick={() => {
            setEditEmployee(null);
            setShowModal(true);
          }}
        >
          + Add Employee
        </button>
      </div>

      {/* Employee Directory */}
      <div className="employee-directory">
        <h2>Employee Directory</h2>
        {filteredEmployees.map((emp) => (
          <div key={emp.id} className="employee-card">
            <div className="avatar">{emp.name.charAt(0)}</div>
            <div className="info">
              <h3>{emp.name}</h3>
              <p>
                {emp.role} • {emp.department}
              </p>
              <p>{emp.email}</p>
              <p>{emp.phone}</p>
              <p>Joined: {emp.joinDate}</p>
              <p>
                <strong>ID:</strong> {emp.id} | <strong>Password:</strong>{" "}
                {emp.password}
              </p>
            </div>
            <div className="actions">
              <button
                className="edit-btn"
                onClick={() => {
                  setEditEmployee(emp);
                  setShowModal(true);
                }}
              >
                ✏️ Edit
              </button>
              <button
                className="delete-btn"
                onClick={() => handleDelete(emp.id)}
              >
                🗑️ Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {showModal && (
        <EmployeeModal
          onClose={() => setShowModal(false)}
          onSave={handleSaveEmployee}
          employee={editEmployee}
        />
      )}
    </div>
  );
}
