import React, { useState, useEffect } from "react";
import axios from "axios";
import "./TaskManagement.css";

const TaskManagement = () => {
  const [tasks, setTasks] = useState([]);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newTask, setNewTask] = useState({
    title: "",
    description: "",
    priority: "Medium",
    status: "To Do",
    project: "",
    assignedTo: "",
    assignedBy: "Admin",
    dueDate: "",
    estimatedTime: "",
  });

  // Fetch tasks and employees
  useEffect(() => {
    fetchTasks();
    fetchEmployees();
  }, []);

  const fetchTasks = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/tasks");
      setTasks(res.data);
    } catch (error) {
      console.error("❌ Error fetching tasks:", error);
    }
  };

  const fetchEmployees = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/employees");
      setEmployees(res.data);
    } catch (error) {
      console.error("❌ Error fetching employees:", error);
    }
  };

  // Add new task
  const handleAddTask = async (e) => {
    e.preventDefault();
    if (!newTask.title || !newTask.description || !newTask.assignedTo) {
      alert("Please fill all required fields!");
      return;
    }

    try {
      const res = await axios.post(
        "http://localhost:5000/api/tasks/create",
        newTask
      );
      setTasks([...tasks, res.data.task]);
      setShowModal(false);
      setNewTask({
        title: "",
        description: "",
        priority: "Medium",
        status: "To Do",
        project: "",
        assignedTo: "",
        assignedBy: "Admin",
        dueDate: "",
        estimatedTime: "",
      });
    } catch (error) {
      console.error("❌ Error adding task:", error);
    }
  };

  return (
    <div className="task-management">
      {/* Stats */}
      <div className="stats-grid">
        <div className="stat-card total">
          <h3>{tasks.length}</h3>
          <p>Total Tasks</p>
        </div>
        <div className="stat-card pending">
          <h3>{tasks.filter((t) => t.status === "To Do").length}</h3>
          <p>Pending</p>
        </div>
        <div className="stat-card progress">
          <h3>{tasks.filter((t) => t.status === "In Progress").length}</h3>
          <p>In Progress</p>
        </div>
        <div className="stat-card completed">
          <h3>{tasks.filter((t) => t.status === "Completed").length}</h3>
          <p>Completed</p>
        </div>
      </div>

      {/* Header */}
      <div className="tm-header">
        <h2>📋 Task Management</h2>
        <button className="primary-btn" onClick={() => setShowModal(true)}>
          + Assign Task
        </button>
      </div>

      {/* Task List */}
      <div className="task-list">
        {tasks.map((task) => (
          <div key={task._id} className={`task-card ${task.status.toLowerCase()}`}>
            <div className="task-header">
              <h4>{task.title}</h4>
              <span className={`priority ${task.priority.toLowerCase()}`}>
                {task.priority}
              </span>
            </div>
            <p>{task.description}</p>
            <p>
              👤 {task.assignedTo} | 📂 {task.project || "No Project"}
            </p>
            <p>📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "—"}</p>
          </div>
        ))}
      </div>

      {/* Modal */}
      {showModal && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Assign New Task</h3>
            <form onSubmit={handleAddTask}>
              <input
                type="text"
                placeholder="Task Title"
                value={newTask.title}
                onChange={(e) => setNewTask({ ...newTask, title: e.target.value })}
                required
              />
              <textarea
                placeholder="Task Description"
                value={newTask.description}
                onChange={(e) =>
                  setNewTask({ ...newTask, description: e.target.value })
                }
                required
              />
              <select
                value={newTask.priority}
                onChange={(e) => setNewTask({ ...newTask, priority: e.target.value })}
              >
                <option>High</option>
                <option>Medium</option>
                <option>Low</option>
              </select>

              {/* Assign to employee */}
              <select
                value={newTask.assignedTo}
                onChange={(e) => setNewTask({ ...newTask, assignedTo: e.target.value })}
                required
              >
                <option value="">Select Employee</option>
                {employees.map((emp) => (
                  <option key={emp._id} value={emp.employeeId}>
                    {emp.name} ({emp.employeeId})
                  </option>
                ))}
              </select>

              <input
                type="date"
                value={newTask.dueDate}
                onChange={(e) => setNewTask({ ...newTask, dueDate: e.target.value })}
              />
              <div className="modal-actions">
                <button type="button" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="submit" className="primary-btn">
                  Assign
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default TaskManagement;
