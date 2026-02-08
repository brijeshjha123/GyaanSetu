import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { enrollmentService } from "../../services/enrollmentService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { FiBook, FiTarget, FiAward, FiClock } from "react-icons/fi";

export const StudentDashboard = () => {
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchEnrollments();
  }, []);

  const fetchEnrollments = async () => {
    setLoading(true);
    try {
      const response = await enrollmentService.getEnrolledCourses({ limit: 6 });
      setEnrollments(response.data.enrollments);
    } catch (error) {
      toast.error("Failed to load enrollments");
    }
    setLoading(false);
  };

  const stats = [
    {
      label: "Total Enrollments",
      value: enrollments.length,
      icon: <FiBook className="w-8 h-8 text-blue-500" />,
    },
    {
      label: "In Progress",
      value: enrollments.filter((e) => e.status === "active").length,
      icon: <FiClock className="w-8 h-8 text-yellow-500" />,
    },
    {
      label: "Completed",
      value: enrollments.filter((e) => e.status === "completed").length,
      icon: <FiAward className="w-8 h-8 text-green-500" />,
    },
    {
      label: "Learning Time",
      value: "150+ hrs",
      icon: <FiTarget className="w-8 h-8 text-purple-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.firstName}! 👋</h1>
          <p className="text-ul text-blue-100">
            Continue your learning journey with our courses
          </p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          {stats.map((stat, index) => (
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

        {/* Enrolled Courses */}
        <section>
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">My Courses</h2>
            <Link
              to="/courses"
              className="text-blue-600 font-semibold hover:underline"
            >
              Explore More
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading your courses...</div>
          ) : enrollments.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">
                You haven't enrolled in any courses yet
              </p>
              <Link
                to="/courses"
                className="bg-blue-600 text-white px-6 py-2 rounded inline-block hover:bg-blue-700 transition"
              >
                Browse Courses
              </Link>
            </div>
          ) : (
            <div className="grid md:grid-cols-3 gap-6">
              {enrollments.map((enrollment) => (
                <Link
                  key={enrollment._id}
                  to={`/course/${enrollment.course._id}`}
                  className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                >
                  <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-40">
                    <div className="h-full flex items-center justify-center">
                      <div className="text-center text-white">
                        <p className="text-sm font-semibold">Progress</p>
                        <p className="text-3xl font-bold">
                          {enrollment.completionPercentage}%
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="text-lg font-bold mb-2 line-clamp-2">
                      {enrollment.course.title}
                    </h3>
                    <p className="text-gray-600 text-sm mb-3">
                      {enrollment.course.instructor?.firstName}{" "}
                      {enrollment.course.instructor?.lastName}
                    </p>

                    {/* Progress Bar */}
                    <div className="mb-4">
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                          className="bg-blue-600 h-2 rounded-full transition-all"
                          style={{ width: `${enrollment.completionPercentage}%` }}
                        ></div>
                      </div>
                    </div>

                    <div className="flex justify-between items-center text-sm">
                      <span className="text-gray-600">
                        {enrollment.status === "completed"
                          ? "Completed"
                          : "In Progress"}
                      </span>
                      {enrollment.completionPercentage === 100 && (
                        <span className="text-green-600 font-semibold">✓ Done</span>
                      )}
                    </div>

                    <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                      Continue Learning
                    </button>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </section>

        {/* Quick Links */}
        <section className="mt-12">
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <Link
              to="/courses"
              className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 hover:border-blue-600 transition"
            >
              <FiBook className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Browse Courses</h3>
              <p className="text-gray-600">Explore new courses and expand your skills</p>
            </Link>

            <Link
              to="/my-profile"
              className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 hover:border-purple-600 transition"
            >
              <FiTarget className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">My Profile</h3>
              <p className="text-gray-600">View and update your profile information</p>
            </Link>

            <Link
              to="/courses"
              className="bg-green-50 border-2 border-green-200 rounded-lg p-6 hover:border-green-600 transition"
            >
              <FiAward className="w-12 h-12 text-green-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Certificates</h3>
              <p className="text-gray-600">View your earned certificates</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
