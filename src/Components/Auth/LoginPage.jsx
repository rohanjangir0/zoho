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

// Map frontend portal IDs to backend role names
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
      // Send only email & password; backend determines role
      const res = await axios.post("http://localhost:5000/api/auth/login", {
        email,
        password
      });

      // Save token and role
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("role", res.data.role);

      // Redirect based on backend role
      switch (res.data.role) {
        case "Admin":
          navigate("/admin/dashboard");
          break;
        case "Employee":
          navigate("/employee/dashboard");
          break;
        case "SuperAdmin":
          navigate("/superadmin/dashboard");
          break;
        case "Client":
          navigate("/client/dashboard");
          break;
        default:
          alert("Unknown role");
      }
    } catch (err) {
      alert(err.response?.data?.error || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        {/* Left: Portal selection */}
        <div className="portal-section">
          <div className="brand">
            <div className="logo">📊</div>
            <h2>SaaSPlatform</h2>
            <p className="tagline">Enterprise Suite</p>
          </div>

          <h3 className="section-title">Select Your Portal</h3>
          <p className="section-subtitle">Choose the portal that matches your role</p>

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

        {/* Right: Login form */}
        <div className="form-section">
          <h3>Sign In</h3>
          <p className="portal-name">
            {portals.find((p) => p.id === selectedPortal)?.title} Portal
          </p>

          <form onSubmit={handleLogin}>
            <div className="form-group">
              <label>Email Address</label>
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

            <button type="submit" className="btn-submit" disabled={loading}>
              {loading ? "Signing In..." : `Sign In as ${portals.find(p => p.id === selectedPortal)?.title}`}
            </button>
          </form>
        </div>
      </div>

      <footer>© 2025 SaaSPlatform. All rights reserved.</footer>
    </div>
  );
};

export default LoginPage;
