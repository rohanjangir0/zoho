import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminLeaveApprovals from "./AdminLeaveApprovals/AdminLeaveApprovals";
import EmployeeManagement from "./EmployeeDetailes/EmployeeManagement";

export const adminRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "leave-approvals", element: <AdminLeaveApprovals /> },
  { path: "employee-management", element: <EmployeeManagement /> },
  // { path: "reports", element: <Reports /> },
];
