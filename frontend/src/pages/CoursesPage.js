import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { courseService } from "../services/courseService";
import { useAuth } from "../contexts/AuthContext";
import { toast } from "react-toastify";

export const CoursesPage = () => {
  const [courses, setCourses] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [page, setPage] = useState(parseInt(searchParams.get("page")) || 1);
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [search, setSearch] = useState(searchParams.get("search") || "");
  const [pagination, setPagination] = useState(null);
  const { isAuthenticated } = useAuth();

  const categories = [
    "Programming",
    "Web Development",
    "Data Science",
    "Mobile Development",
    "UI/UX Design",
    "Business",
    "Languages",
  ];

  useEffect(() => {
    fetchCourses();
  }, [page, category, search]);

  const fetchCourses = async () => {
    setLoading(true);
    try {
      const params = {
        page,
        limit: 12,
      };
      if (category) params.category = category;
      if (search) params.search = search;

      const response = await courseService.getAllCourses(params);
      setCourses(response.data.courses);
      setPagination(response.data.pagination);
    } catch (error) {
      toast.error("Failed to load courses");
    }
    setLoading(false);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setPage(1);
    setSearchParams({
      ...(search && { search }),
      ...(category && { category }),
    });
  };

  const handleCategoryChange = (selectedCategory) => {
    setCategory(selectedCategory === category ? "" : selectedCategory);
    setPage(1);
    setSearchParams({
      ...(search && { search }),
      ...(selectedCategory !== category && { category: selectedCategory }),
    });
  };

  if (loading && courses.length === 0) {
    return <div className="text-center py-20">Loading courses...</div>;
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h1 className="text-4xl font-bold mb-6">Explore Courses</h1>
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <input
              type="text"
              placeholder="Search courses..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="flex-1 px-4 py-2 rounded text-gray-800 focus:outline-none"
            />
            <button
              type="submit"
              className="bg-white text-blue-600 px-6 py-2 rounded font-semibold hover:bg-gray-100 transition"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar - Categories */}
          <div>
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold mb-4">Categories</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleCategoryChange("")}
                  className={`block w-full text-left px-4 py-2 rounded transition ${
                    !category
                      ? "bg-blue-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  All Categories
                </button>
                {categories.map((cat) => (
                  <button
                    key={cat}
                    onClick={() => handleCategoryChange(cat)}
                    className={`block w-full text-left px-4 py-2 rounded transition ${
                      category === cat
                        ? "bg-blue-600 text-white"
                        : "text-gray-700 hover:bg-gray-100"
                    }`}
                  >
                    {cat}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Courses Grid */}
          <div className="lg:col-span-3">
            {courses.length === 0 ? (
              <div className="bg-white rounded-lg shadow p-12 text-center">
                <p className="text-gray-600 text-lg">No courses found</p>
              </div>
            ) : (
              <div className="grid md:grid-cols-2 gap-6">
                {courses.map((course) => (
                  <Link
                    key={course._id}
                    to={`/course/${course._id}`}
                    className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden"
                  >
                    <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-40"></div>
                    <div className="p-4">
                      <h3 className="text-lg font-bold mb-2 line-clamp-2">
                        {course.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-2">
                        {course.instructor?.firstName} {course.instructor?.lastName}
                      </p>
                      <p className="text-gray-600 text-sm mb-3">{course.category}</p>
                      <div className="flex justify-between items-center mb-4">
                        <span className="text-blue-600 font-semibold">
                          {course.isFree ? "Free" : `₹${course.price}`}
                        </span>
                        <span className="text-yellow-500 text-sm">
                          ★ {course.rating.toFixed(1)}
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-4">
                        {course.students} students
                      </p>
                      <button
                        onClick={(e) => {
                          e.preventDefault();
                          if (!isAuthenticated) {
                            window.location.href = "/login";
                          }
                        }}
                        className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold"
                      >
                        View Course
                      </button>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Pagination */}
            {pagination && pagination.pages > 1 && (
              <div className="flex justify-center items-center gap-2 mt-8">
                <button
                  onClick={() => setPage(Math.max(1, page - 1))}
                  disabled={page === 1}
                  className="px-4 py-2 bg-white rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition"
                >
                  Previous
                </button>
                {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                  (p) => (
                    <button
                      key={p}
                      onClick={() => setPage(p)}
                      className={`px-4 py-2 rounded transition ${
                        p === page
                          ? "bg-blue-600 text-white"
                          : "bg-white border border-gray-300 hover:bg-gray-100"
                      }`}
                    >
                      {p}
                    </button>
                  )
                )}
                <button
                  onClick={() => setPage(Math.min(pagination.pages, page + 1))}
                  disabled={page === pagination.pages}
                  className="px-4 py-2 bg-white rounded border border-gray-300 disabled:opacity-50 hover:bg-gray-100 transition"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
