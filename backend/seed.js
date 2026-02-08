const mongoose = require("mongoose");
const User = require("./models/User");
const Course = require("./models/Course");
const Category = require("./models/Category");
require("dotenv").config();

const seedDatabase = async () => {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);

    console.log("Connected to MongoDB");

    // Clear existing data
    await User.deleteMany({});
    await Course.deleteMany({});
    await Category.deleteMany({});

    // Create categories
    const categories = await Category.insertMany([
      { name: "Programming", description: "Learn programming languages" },
      { name: "Web Development", description: "Build modern web applications" },
      { name: "Data Science", description: "Master data science and analytics" },
      { name: "Mobile Development", description: "Create mobile apps" },
      { name: "UI/UX Design", description: "Design beautiful user interfaces" },
      { name: "Business", description: "Business and entrepreneurship" },
      { name: "Languages", description: "Learn new languages" },
    ]);

    console.log("✓ Categories created");

    // Create users
    const students = await User.create([
      {
        firstName: "Rahul",
        lastName: "Kumar",
        email: "student@demo.com",
        password: "password",
        role: "student",
      },
      {
        firstName: "Priya",
        lastName: "Sharma",
        email: "student2@demo.com",
        password: "password",
        role: "student",
      },
    ]);

    const instructors = await User.create([
      {
        firstName: "John",
        lastName: "Doe",
        email: "instructor@demo.com",
        password: "password",
        role: "instructor",
        bio: "Expert in web development and software engineering",
      },
      {
        firstName: "Jane",
        lastName: "Smith",
        email: "instructor2@demo.com",
        password: "password",
        role: "instructor",
        bio: "Python and Data Science specialist",
      },
    ]);

    const admin = await User.create({
      firstName: "Admin",
      lastName: "User",
      email: "admin@demo.com",
      password: "password",
      role: "admin",
    });

    console.log("✓ Users created");

    // Create sample courses
    const courses = await Course.create([
      {
        title: "Web Development Basics",
        description:
          "Learn the fundamentals of web development with HTML, CSS, and JavaScript",
        category: "Web Development",
        instructor: instructors[0]._id,
        level: "Beginner",
        isFree: true,
        isApproved: true,
        isPublished: true,
        rating: 4.8,
        students: 1250,
      },
      {
        title: "Advanced Python",
        description:
          "Master advanced Python concepts and best practices for professional development",
        category: "Programming",
        instructor: instructors[1]._id,
        level: "Advanced",
        isFree: true,
        isApproved: true,
        isPublished: true,
        rating: 4.9,
        students: 890,
      },
      {
        title: "React Mastery",
        description: "Build modern, scalable web applications with React and Redux",
        category: "Web Development",
        instructor: instructors[0]._id,
        level: "Intermediate",
        isFree: true,
        isApproved: true,
        isPublished: true,
        rating: 4.7,
        students: 2100,
      },
      {
        title: "Data Science Fundamentals",
        description:
          "Introduction to data science, machine learning, and statistical analysis",
        category: "Data Science",
        instructor: instructors[1]._id,
        level: "Beginner",
        isFree: true,
        isApproved: true,
        isPublished: true,
        rating: 4.6,
        students: 1500,
      },
    ]);

    console.log("✓ Courses created");

    console.log("\n✅ Database seeded successfully!");
    console.log("\nDemo Credentials:");
    console.log("Student: student@demo.com / password");
    console.log("Instructor: instructor@demo.com / password");
    console.log("Admin: admin@demo.com / password");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
