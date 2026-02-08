const Enrollment = require("../models/Enrollment");
const Course = require("../models/Course");
const Progress = require("../models/Progress");
const Lesson = require("../models/Lesson");

// Enroll in course
const enrollCourse = async (req, res) => {
  try {
    const { courseId } = req.body;

    if (!courseId) {
      return res.status(400).json({ message: "Course ID is required" });
    }

    // Check if course exists
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    // Check if already enrolled
    const existingEnrollment = await Enrollment.findOne({
      student: req.user.id,
      course: courseId,
    });

    if (existingEnrollment) {
      return res.status(400).json({ message: "Already enrolled in this course" });
    }

    // Create enrollment
    const enrollment = new Enrollment({
      student: req.user.id,
      course: courseId,
    });

    await enrollment.save();

    // Initialize progress for all lessons
    const lessons = await Lesson.find({ course: courseId });
    const progressPromises = lessons.map((lesson) =>
      Progress.create({
        enrollment: enrollment._id,
        lesson: lesson._id,
      })
    );
    await Promise.all(progressPromises);

    // Update course students count
    await Course.findByIdAndUpdate(courseId, { $inc: { students: 1 } });

    res.status(201).json({
      message: "Enrolled successfully",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enrolled courses
const getEnrolledCourses = async (req, res) => {
  try {
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    const enrollments = await Enrollment.find({ student: req.user.id })
      .populate({
        path: "course",
        populate: { path: "instructor", select: "firstName lastName profilePicture" },
      })
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Enrollment.countDocuments({ student: req.user.id });

    res.status(200).json({
      enrollments,
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

// Get enrollment details
const getEnrollmentDetails = async (req, res) => {
  try {
    const enrollment = await Enrollment.findById(req.params.id)
      .populate("course")
      .populate("student", "firstName lastName profilePicture email");

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Check authorization
    if (
      enrollment.student._id.toString() !== req.user.id &&
      enrollment.course.instructor.toString() !== req.user.id
    ) {
      return res.status(403).json({ message: "Not authorized" });
    }

    // Get progress for all lessons
    const progress = await Progress.find({ enrollment: req.params.id });

    res.status(200).json({
      enrollment,
      progress,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course enrollments (instructor)
const getCourseEnrollments = async (req, res) => {
  try {
    const { courseId } = req.params;
    const page = req.query.page || 1;
    const limit = req.query.limit || 10;
    const skip = (page - 1) * limit;

    // Check if course belongs to instructor
    const course = await Course.findById(courseId);
    if (!course || course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const enrollments = await Enrollment.find({ course: courseId })
      .populate("student", "firstName lastName email profilePicture")
      .skip(skip)
      .limit(parseInt(limit));

    const total = await Enrollment.countDocuments({ course: courseId });

    res.status(200).json({
      enrollments,
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

// Update enrollment status
const updateEnrollmentStatus = async (req, res) => {
  try {
    const { status } = req.body;

    if (!["active", "completed", "dropped"].includes(status)) {
      return res.status(400).json({ message: "Invalid status" });
    }

    const enrollment = await Enrollment.findByIdAndUpdate(
      req.params.id,
      { status },
      { new: true }
    );

    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    res.status(200).json({
      message: "Enrollment updated",
      enrollment,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  enrollCourse,
  getEnrolledCourses,
  getEnrollmentDetails,
  getCourseEnrollments,
  updateEnrollmentStatus,
};
