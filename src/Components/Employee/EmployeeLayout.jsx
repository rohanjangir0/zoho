import React from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar/Sidebar";
import Navbar from "./Navbar/Navbar";

const EmployeeLayout = () => {
  return (
    <div>
      <Sidebar />
      <Navbar />
      <div style={{ marginLeft: "250px", marginTop: "70px", padding: "20px" }}>
        <Outlet /> {/* employee pages will render here */}
      </div>
    </div>
  );
};

export default EmployeeLayout;
