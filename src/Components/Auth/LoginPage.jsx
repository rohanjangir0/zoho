import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";
import { FaUser, FaUserShield, FaUsers } from "react-icons/fa";
import { MdOutlineAdminPanelSettings } from "react-icons/md";
import axios from "axios";

const portals = [
  { id: "employee", title: "Employee", description: "Access your tasks & dashboard", icon: <FaUser /> },
  { id: "admin", title: "Admin", description: "Manage employees & approvals", icon: <MdOutlineAdminPanelSettings /> },
  { id: "superadmin", title: "Super Admin", description: "Full company access", icon: <FaUserShield /> },
  { id: "client", title: "Client", description: "Track project progress", icon: <FaUsers /> },
];

const roleMap = {
  employee: "Employee",
  admin: "Admin",
  superadmin: "SuperAdmin",
  client: "Client",
};

const LoginPage = () => {
  const [selectedPortal, setSelectedPortal] = useState("employee");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password,
        role: roleMap[selectedPortal],
      });

      // Save user info in localStorage
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);
      localStorage.setItem("name", res.data.name);
      localStorage.setItem("department", res.data.department);

      // Redirect to correct dashboard
      switch (res.data.role.toLowerCase()) {
        case "admin":
          navigate("/admin/dashboard");
          break;
        case "employee":
          navigate("/employee/dashboard");
          break;
        case "superadmin":
          navigate("/superadmin/dashboard");
          break;
        case "client":
          navigate("/client/dashboard");
          break;
        default:
          alert("Unknown role");
      }
    } catch (err) {
      console.error("Login error:", err);
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="portal-section">
          <div className="brand">
            <div className="logo">📊</div>
            <h2>SaaSPlatform</h2>
            <p className="tagline">Enterprise Suite</p>
          </div>

          <h3>Select Your Portal</h3>
          <div className="portal-grid">
            {portals.map((portal) => (
              <div
                key={portal.id}
                className={`portal-card ${selectedPortal === portal.id ? "active" : ""}`}
                onClick={() => setSelectedPortal(portal.id)}
              >
                <div className="portal-icon">{portal.icon}</div>
                <div className="portal-info">
                  <h4>{portal.title}</h4>
                  <p>{portal.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="form-section">
          <h3>Sign In</h3>
          <p>{portals.find((p) => p.id === selectedPortal)?.title} Portal</p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="john.smith@company.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label>Password</label>
              <input
                type="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "Signing In..." : `Sign In as ${portals.find((p) => p.id === selectedPortal)?.title}`}
            </button>
          </form>
        </div>
      </div>
      <footer>© 2025 SaaSPlatform. All rights reserved.</footer>
    </div>
  );
};

export default LoginPage;
