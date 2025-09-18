import React from "react";

import { Search } from "lucide-react";
import { Bell } from "lucide-react";
import { Settings } from "lucide-react";
import { Filter } from "lucide-react";
import { UserPlus } from "lucide-react";


import "./AdminNavbar.css";

export default function AdminNavbar() {
  return (
    <header className="admin-navbar">
      {/* Left: Title */}
      <div className="navbar-left">
        <h2>Employee Management</h2>
        <p>Admin Management Portal</p>
      </div>

      {/* Right: Actions */}
      <div className="navbar-right">
        <div className="search-box">
          <Search size={16} />
          <input type="text" placeholder="Search..." />
        </div>
        <button className="btn-light">
          <Filter size={16} /> Filter
        </button>
        <button className="btn-dark">
          <UserPlus size={16} /> Add Employee
        </button>
        <Bell className="icon-btn" size={20} />
        <Settings className="icon-btn" size={20} />
      </div>
    </header>
  );
}
