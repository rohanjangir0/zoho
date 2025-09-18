import React from "react";
import { Outlet } from "react-router-dom";
import AdminSidebar from "./AdminSidebar/AdminSidebar";
import AdminNavbar from "./AdminNavbar/AdminNavbar";

const AdminLayout = () => {
  return (
    <>
      <AdminSidebar />
      <AdminNavbar />
      <div style={{ marginLeft: "250px", marginTop: "70px", padding: "20px" }}>
        <Outlet />
      </div>
    </>
  );
};

export default AdminLayout;
