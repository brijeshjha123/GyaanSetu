import React, { useState, useEffect } from "react";
import { adminService } from "../../services/adminService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { FiUsers, FiBook, FiTrendingUp, FiCheckCircle } from "react-icons/fi";
import { Link } from "react-router-dom";

export const AdminDashboard = () => {
  const [analytics, setAnalytics] = useState(null);
  const [pendingCourses, setPendingCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchAnalytics();
    fetchPendingCourses();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await adminService.getPlatformAnalytics();
      setAnalytics(response.data);
    } catch (error) {
      toast.error("Failed to load analytics");
    }
  };

  const fetchPendingCourses = async () => {
    setLoading(true);
    try {
      const response = await adminService.getPendingCourses({ limit: 5 });
      setPendingCourses(response.data.courses);
    } catch (error) {
      toast.error("Failed to load pending courses");
    }
    setLoading(false);
  };

  const handleApproveCourse = async (courseId) => {
    try {
      await adminService.approveCourse(courseId);
      toast.success("Course approved!");
      fetchPendingCourses();
    } catch (error) {
      toast.error("Failed to approve course");
    }
  };

  const handleRejectCourse = async (courseId) => {
    try {
      await adminService.rejectCourse(courseId, "Course does not meet standards");
      toast.success("Course rejected!");
      fetchPendingCourses();
    } catch (error) {
      toast.error("Failed to reject course");
    }
  };

  if (!analytics) {
    return <div className="text-center py-20">Loading analytics...</div>;
  }

  const statsList = [
    {
      label: "Total Users",
      value: analytics.totalUsers,
      icon: <FiUsers className="w-8 h-8 text-blue-500" />,
    },
    {
      label: "Students",
      value: analytics.totalStudents,
      icon: <FiBook className="w-8 h-8 text-green-500" />,
    },
    {
      label: "Instructors",
      value: analytics.totalInstructors,
      icon: <FiUsers className="w-8 h-8 text-purple-500" />,
    },
    {
      label: "Total Courses",
      value: analytics.totalCourses,
      icon: <FiTrendingUp className="w-8 h-8 text-orange-500" />,
    },
    {
      label: "Approved Courses",
      value: analytics.approvedCourses,
      icon: <FiCheckCircle className="w-8 h-8 text-green-600" />,
    },
    {
      label: "Enrollments",
      value: analytics.totalEnrollments,
      icon: <FiTrendingUp className="w-8 h-8 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Admin Dashboard</h1>
          <p className="text-lg text-blue-100">Manage platform users, courses, and analytics</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Analytics Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {statsList.map((stat, index) => (
            <div
              key={index}
              className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
            >
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-gray-600 text-sm font-semibold">{stat.label}</p>
                  <p className="text-3xl font-bold mt-2">{stat.value}</p>
                </div>
                {stat.icon}
              </div>
            </div>
          ))}
        </div>

        {/* Quick Admin Links */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Admin Tools</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/admin/users"
              className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 hover:border-blue-600 transition"
            >
              <FiUsers className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Manage Users</h3>
              <p className="text-gray-600">View and manage all platform users</p>
            </Link>

            <Link
              to="/admin/courses"
              className="bg-green-50 border-2 border-green-200 rounded-lg p-6 hover:border-green-600 transition"
            >
              <FiBook className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Manage Courses</h3>
              <p className="text-gray-600">Approve/Reject courses and manage categories</p>
            </Link>

            <Link
              to="/admin/categories"
              className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 hover:border-purple-600 transition"
            >
              <FiTrendingUp className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Categories</h3>
              <p className="text-gray-600">Manage course categories</p>
            </Link>
          </div>
        </section>

        {/* Pending Courses */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold">
              Pending Course Approvals ({pendingCourses.length})
            </h2>
            <Link
              to="/admin/courses"
              className="text-blue-600 font-semibold hover:underline"
            >
              View All
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading pending courses...</div>
          ) : pendingCourses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg">No pending courses</p>
            </div>
          ) : (
            <div className="space-y-4">
              {pendingCourses.map((course) => (
                <div
                  key={course._id}
                  className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition"
                >
                  <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
                    <div className="flex-1">
                      <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                      <p className="text-gray-600 mb-3 line-clamp-2">
                        {course.description}
                      </p>
                      <p className="text-sm text-gray-500">
                        By: {course.instructor?.firstName} {course.instructor?.lastName}
                        ({course.instructor?.email})
                      </p>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <button
                        onClick={() => handleApproveCourse(course._id)}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold"
                      >
                        Approve
                      </button>
                      <button
                        onClick={() => handleRejectCourse(course._id)}
                        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700 transition font-semibold"
                      >
                        Reject
                      </button>
                      <Link
                        to={`/course/${course._id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold text-center"
                      >
                        Preview
                      </Link>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
};
