import AdminDashboard from "./AdminDashboard/AdminDashboard";
import AdminLeaveApprovals from "./AdminLeaveApprovals/AdminLeaveApprovals";
import EmployeeManagement from "./EmployeeDetailes/EmployeeManagement";
import TaskManagement from "./TaskManagement/TaskManagement"; // ✅ New Import
import AdminChatApp from "./AdminChatApp/AdminChatApp"  // add this at the top


export const adminRoutes = [
  { path: "dashboard", element: <AdminDashboard /> },
  { path: "leave-approvals", element: <AdminLeaveApprovals /> },
  { path: "employee-management", element: <EmployeeManagement /> },
  { path: "task-management", element: <TaskManagement /> }, // ✅ New Route
  // { path: "reports", element: <Reports /> },
  { path: "chat", element: <AdminChatApp userId={"68cd060f433e048855e28479"} /> },
];
