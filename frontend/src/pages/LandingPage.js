import React from "react";
import { Link } from "react-router-dom";
import { FiBookOpen, FiAward, FiUsers, FiTrendingUp } from "react-icons/fi";

export const LandingPage = () => {
  const features = [
    {
      icon: <FiBookOpen className="w-12 h-12" />,
      title: "Rich Courses",
      description: "Comprehensive courses with video, quizzes, and assignments",
    },
    {
      icon: <FiAward className="w-12 h-12" />,
      title: "Certifications",
      description: "Earn certificates upon course completion",
    },
    {
      icon: <FiUsers className="w-12 h-12" />,
      title: "Community",
      description: "Learn from experienced instructors and community",
    },
    {
      icon: <FiTrendingUp className="w-12 h-12" />,
      title: "Track Progress",
      description: "Monitor your learning journey with detailed analytics",
    },
  ];

  const courses = [
    {
      id: 1,
      title: "Web Development Basics",
      instructor: "John Doe",
      students: 1250,
      rating: 4.8,
      price: "Free",
    },
    {
      id: 2,
      title: "Advanced Python",
      instructor: "Jane Smith",
      students: 890,
      rating: 4.9,
      price: "Free",
    },
    {
      id: 3,
      title: "React Mastery",
      instructor: "Mike Johnson",
      students: 2100,
      rating: 4.7,
      price: "Free",
    },
  ];

  const testimonials = [
    {
      name: "Rahul Kumar",
      role: "Student",
      text: "iGyan Setu has been transformative! The courses are well-structured and the instructors are amazing.",
      rating: 5,
    },
    {
      name: "Priya Sharma",
      role: "Instructor",
      text: "A wonderful platform to share knowledge. The tools provided are intuitive and comprehensive.",
      rating: 5,
    },
    {
      name: "Amit Patel",
      role: "Student",
      text: "The best part is the progress tracking and feedback system. Really helps me stay motivated.",
      rating: 4.8,
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Welcome to iGyan Setu</h1>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            The interactive e-learning platform where learning becomes an engaging journey.
            Access quality courses from industry experts and grow your skills.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/courses"
              className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition"
            >
              Explore Courses
            </Link>
            <Link
              to="/signup"
              className="bg-purple-500 text-white px-8 py-3 rounded-lg font-bold hover:bg-purple-600 transition"
            >
              Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Why Choose iGyan Setu?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow hover:shadow-lg transition">
                <div className="text-blue-600 mb-4">{feature.icon}</div>
                <h3 className="text-xl font-bold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses Section */}
      <section className="py-20">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">Popular Courses</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course) => (
              <Link key={course.id} to="/courses" className="bg-white rounded-lg shadow hover:shadow-lg transition overflow-hidden">
                <div className="bg-gradient-to-r from-blue-500 to-purple-500 h-48"></div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                  <p className="text-gray-600 text-sm mb-3">by {course.instructor}</p>
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-sm text-gray-500">{course.students} students</span>
                    <span className="text-yellow-500 font-semibold">★ {course.rating}</span>
                  </div>
                  <button className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition font-semibold">
                    Enroll Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-4xl font-bold text-center mb-12">What Our Users Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
                  <div className="ml-4">
                    <h4 className="font-bold">{testimonial.name}</h4>
                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                  </div>
                </div>
                <div className="text-yellow-500 mb-2">★ {testimonial.rating}</div>
                <p className="text-gray-600 italic">"{testimonial.text}"</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-blue-600 text-white py-16">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Start Learning?</h2>
          <p className="text-lg mb-8">Join thousands of students and instructors on iGyan Setu</p>
          <Link
            to="/signup"
            className="bg-white text-blue-600 px-8 py-3 rounded-lg font-bold hover:bg-gray-100 transition inline-block"
          >
            Sign Up Now
          </Link>
        </div>
      </section>
    </div>
  );
};
