import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { courseService } from "../../services/courseService";
import { useAuth } from "../../contexts/AuthContext";
import { toast } from "react-toastify";
import { FiBook, FiUsers, FiBarChart2, FiPlus } from "react-icons/fi";

export const InstructorDashboard = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    fetchCourses();
  }, []);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const response = await courseService.getInstructorCourses({ limit: 6 });
      setCourses(response.data.courses);
    } catch (error) {
      toast.error("Failed to load courses");
    }
    setLoading(false);
  };

  const stats = [
    {
      label: "Total Courses",
      value: courses.length,
      icon: <FiBook className="w-8 h-8 text-blue-500" />,
    },
    {
      label: "Total Students",
      value: courses.reduce((sum, course) => sum + course.students, 0),
      icon: <FiUsers className="w-8 h-8 text-green-500" />,
    },
    {
      label: "Published",
      value: courses.filter((c) => c.isPublished).length,
      icon: <FiBarChart2 className="w-8 h-8 text-purple-500" />,
    },
    {
      label: "Pending Approval",
      value: courses.filter((c) => !c.isApproved).length,
      icon: <FiBarChart2 className="w-8 h-8 text-yellow-500" />,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-2">Welcome, {user?.firstName}! 👋</h1>
          <p className="text-lg text-blue-100">Manage your courses and students</p>
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

        {/* My Courses */}
        <section className="mb-12">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">My Courses</h2>
            <Link
              to="/instructor/create-course"
              className="bg-blue-600 text-white px-6 py-2 rounded flex items-center gap-2 hover:bg-blue-700 transition font-semibold"
            >
              <FiPlus className="w-5 h-5" />
              Create Course
            </Link>
          </div>

          {loading ? (
            <div className="text-center py-12">Loading your courses...</div>
          ) : courses.length === 0 ? (
            <div className="bg-white rounded-lg shadow p-12 text-center">
              <p className="text-gray-600 text-lg mb-4">You haven't created any courses</p>
              <Link
                to="/instructor/create-course"
                className="bg-blue-600 text-white px-6 py-2 rounded inline-block hover:bg-blue-700 transition"
              >
                Create Your First Course
              </Link>
            </div>
          ) : (
            <div className="space-y-4">
              {courses.map((course) => (
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
                      <div className="grid grid-cols-3 gap-4 text-sm">
                        <div>
                          <p className="text-gray-500">Students</p>
                          <p className="font-bold text-lg">{course.students}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Rating</p>
                          <p className="font-bold text-lg">★ {course.rating}</p>
                        </div>
                        <div>
                          <p className="text-gray-500">Status</p>
                          <p className="font-bold">
                            {course.isPublished ? (
                              <span className="text-green-600">Published</span>
                            ) : (
                              <span className="text-yellow-600">Draft</span>
                            )}
                          </p>
                        </div>
                      </div>
                    </div>
                    <div className="flex flex-col gap-2 w-full md:w-auto">
                      <Link
                        to={`/instructor/edit-course/${course._id}`}
                        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition font-semibold text-center"
                      >
                        Edit
                      </Link>
                      <Link
                        to={`/instructor/course/${course._id}/students`}
                        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700 transition font-semibold text-center"
                      >
                        View Students
                      </Link>
                      <Link
                        to={`/course/${course._id}`}
                        className="bg-purple-600 text-white px-6 py-2 rounded hover:bg-purple-700 transition font-semibold text-center"
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

        {/* Quick Actions */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Quick Actions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <Link
              to="/instructor/create-course"
              className="bg-blue-50 border-2 border-blue-200 rounded-lg p-6 hover:border-blue-600 transition"
            >
              <FiPlus className="w-12 h-12 text-blue-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">Create New Course</h3>
              <p className="text-gray-600">
                Start creating a new course to share your knowledge
              </p>
            </Link>

            <Link
              to="/my-profile"
              className="bg-purple-50 border-2 border-purple-200 rounded-lg p-6 hover:border-purple-600 transition"
            >
              <FiUsers className="w-12 h-12 text-purple-600 mb-4" />
              <h3 className="text-lg font-bold mb-2">My Profile</h3>
              <p className="text-gray-600">View and update your instructor profile</p>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
};
