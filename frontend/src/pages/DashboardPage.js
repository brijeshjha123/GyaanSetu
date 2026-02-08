import React from "react";
import { useAuth } from "../contexts/AuthContext";
import { StudentDashboard } from "./dashboards/StudentDashboard";
import { InstructorDashboard } from "./dashboards/InstructorDashboard";
import { AdminDashboard } from "./dashboards/AdminDashboard";

export const DashboardPage = () => {
  const { user } = useAuth();

  if (!user) {
    return <div className="text-center py-20">Loading...</div>;
  }

  return (
    <div>
      {user.role === "student" && <StudentDashboard />}
      {user.role === "instructor" && <InstructorDashboard />}
      {user.role === "admin" && <AdminDashboard />}
    </div>
  );
};
