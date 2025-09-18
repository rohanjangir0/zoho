import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminLeaveApprovals from "./AdminLeaveApprovals/AdminLeaveApprovals";

export const adminRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "leave-approvals", element: <AdminLeaveApprovals /> },
];

  // { path: "reports", element: <Reports /> },

