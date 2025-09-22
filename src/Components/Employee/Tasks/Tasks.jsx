import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Tasks.css"; // your CSS

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const employeeId = localStorage.getItem("employeeId"); // ensure stored on login

  useEffect(() => {
    if (!employeeId) return;
    fetchTasks();
  }, [employeeId]);

  const fetchTasks = async () => {
    try {
      const res = await axios.get(
        `http://localhost:5000/api/tasks/employee/${employeeId}`
      );
      setTasks(Array.isArray(res.data) ? res.data : []);
    } catch (err) {
      console.error("Error fetching tasks:", err);
    }
  };

  const getStatusClass = (status) => {
    switch (status) {
      case "Completed": return "status completed";
      case "In Progress": return "status inprogress";
      default: return "status todo";
    }
  };

  const getPriorityClass = (priority) => {
    switch (priority) {
      case "High": return "priority high";
      case "Medium": return "priority medium";
      case "Low": return "priority low";
      default: return "priority";
    }
  };

  return (
    <div className="tasks-page">
      <h2>📋 My Tasks</h2>
      {tasks.length === 0 ? (
        <p className="no-task">No tasks assigned yet.</p>
      ) : (
        <div className="task-grid">
          {tasks.map((task) => (
            <div className="task-card" key={task._id}>
              <div className="task-header">
                <h3>{task.title}</h3>
                <span className={getStatusClass(task.status)}>
                  {task.status}
                </span>
              </div>
              <p className="task-desc">{task.description}</p>
              <div className="task-meta">
                <span className={getPriorityClass(task.priority)}>
                  {task.priority} Priority
                </span>
                <span className="project">📂 {task.project || "General"}</span>
              </div>
              <div className="task-footer">
                <span>📅 {task.dueDate ? new Date(task.dueDate).toLocaleDateString() : "No deadline"}</span>
                <span>⏱ {task.estimatedTime || "N/A"}</span>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Tasks;
