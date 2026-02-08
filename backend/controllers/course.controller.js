const Course = require("../models/Course");
const Lesson = require("../models/Lesson");
const Enrollment = require("../models/Enrollment");

// Create course (instructor)
const createCourse = async (req, res) => {
  try {
    const {
      title,
      description,
      category,
      level,
      price,
      isFree,
      thumbnail,
    } = req.body;

    if (!title || !description || !category) {
      return res.status(400).json({
        message: "Title, description, and category are required",
      });
    }

    const course = new Course({
      title,
      description,
      category,
      instructor: req.user.id,
      level: level || "Beginner",
      price: isFree ? 0 : price,
      isFree: isFree !== false,
      thumbnail,
    });

    await course.save();

    res.status(201).json({
      message: "Course created successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get all courses (public)
const getAllCourses = async (req, res) => {
  try {
    const { category, search, page = 1, limit = 10 } = req.query;

    const query = { isPublished: true, isApproved: true };

    if (category) query.category = category;
    if (search) {
      query.$or = [
        { title: { $regex: search, $options: "i" } },
        { description: { $regex: search, $options: "i" } },
      ];
    }

    const skip = (page - 1) * limit;

    const courses = await Course.find(query)
      .populate("instructor", "firstName lastName profilePicture")
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Course.countDocuments(query);

    res.status(200).json({
      courses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course by ID
const getCourseById = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id)
      .populate("instructor", "firstName lastName profilePicture bio")
      .populate("lessons");

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update course (instructor)
const updateCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const {
      title,
      description,
      category,
      level,
      price,
      isFree,
      thumbnail,
      isPublished,
    } = req.body;

    if (title) course.title = title;
    if (description) course.description = description;
    if (category) course.category = category;
    if (level) course.level = level;
    if (isFree !== undefined) {
      course.isFree = isFree;
      course.price = isFree ? 0 : price;
    }
    if (price && !isFree) course.price = price;
    if (thumbnail) course.thumbnail = thumbnail;
    if (isPublished !== undefined) course.isPublished = isPublished;

    await course.save();

    res.status(200).json({
      message: "Course updated successfully",
      course,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete course (instructor)
const deleteCourse = async (req, res) => {
  try {
    const course = await Course.findById(req.params.id);

    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check ownership
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Check if any students enrolled
    const enrollment = await Enrollment.findOne({ course: req.params.id });
    if (enrollment) {
      return res.status(400).json({
        message: "Cannot delete course with enrolled students",
      });
    }

    await Course.findByIdAndDelete(req.params.id);
    await Lesson.deleteMany({ course: req.params.id });

    res.status(200).json({
      message: "Course deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get instructor courses
const getInstructorCourses = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const courses = await Course.find({ instructor: req.user.id })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Course.countDocuments({ instructor: req.user.id });

    res.status(200).json({
      courses,
      pagination: {
        total,
        page: parseInt(page),
        limit: parseInt(limit),
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourse,
  deleteCourse,
  getInstructorCourses,
};
