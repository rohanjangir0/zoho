import React from "react";
import { Routes, Route } from "react-router-dom";

import LoginPage from "./Components/Auth/LoginPage";
import EmployeeLayout from "./Components/Employee/EmployeeLayout";
import { employeeRoutes } from "./Components/Employee/employeeRoutes";
import AdminLayout from "./Components/Admin/AdminLayout";
import { adminRoutes } from "./Components/Admin/adminRoutes";
import ProtectedRoute from "./Components/common/ProtectedRoute";

function App() {
  return (
    <Routes>
      {/* Public Login Route */}
      <Route path="/" element={<LoginPage />} />

      {/* Employee Routes (Protected) */}
      <Route
        path="/employee"
        element={
          <ProtectedRoute role="employee">
            <EmployeeLayout />
          </ProtectedRoute>
        }
      >
        {employeeRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>

      {/* Admin Routes (Protected) */}
      <Route
        path="/admin"
        element={
          <ProtectedRoute role="admin">
            <AdminLayout />
          </ProtectedRoute>
        }
      >
        {adminRoutes.map(({ path, element }, index) => (
          <Route key={index} path={path} element={element} />
        ))}
      </Route>
    </Routes>
  );
}

export default App;
