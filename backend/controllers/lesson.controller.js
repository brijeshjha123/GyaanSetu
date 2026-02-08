const Lesson = require("../models/Lesson");
const Course = require("../models/Course");
const Progress = require("../models/Progress");

// Create lesson
const createLesson = async (req, res) => {
  try {
    const { title, description, courseId, videoUrl, duration, order, resources, transcript } = req.body;

    if (!title || !courseId || !videoUrl || order === undefined) {
      return res.status(400).json({
        message: "Title, courseId, videoUrl, and order are required",
      });
    }

    // Check if course exists and belongs to instructor
    const course = await Course.findById(courseId);
    if (!course) {
      return res.status(404).json({ message: "Course not found" });
    }

    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const lesson = new Lesson({
      title,
      description,
      course: courseId,
      videoUrl,
      duration: duration || 0,
      order,
      resources: resources || [],
      transcript: transcript || null,
    });

    await lesson.save();

    // Add lesson to course
    await Course.findByIdAndUpdate(
      courseId,
      { $push: { lessons: lesson._id } },
      { new: true }
    );

    res.status(201).json({
      message: "Lesson created successfully",
      lesson,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lessons by course
const getLessonsByCourse = async (req, res) => {
  try {
    const lessons = await Lesson.find({ course: req.params.courseId }).sort({
      order: 1,
    });

    res.status(200).json(lessons);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lesson by ID
const getLessonById = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id).populate("course");

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    res.status(200).json(lesson);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Update lesson
const updateLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Check authorization
    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    const { title, description, videoUrl, duration, order, resources, transcript } = req.body;

    if (title) lesson.title = title;
    if (description) lesson.description = description;
    if (videoUrl) lesson.videoUrl = videoUrl;
    if (duration !== undefined) lesson.duration = duration;
    if (order !== undefined) lesson.order = order;
    if (resources) lesson.resources = resources;
    if (transcript) lesson.transcript = transcript;

    await lesson.save();

    res.status(200).json({
      message: "Lesson updated successfully",
      lesson,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Delete lesson
const deleteLesson = async (req, res) => {
  try {
    const lesson = await Lesson.findById(req.params.id);

    if (!lesson) {
      return res.status(404).json({ message: "Lesson not found" });
    }

    // Check authorization
    const course = await Course.findById(lesson.course);
    if (course.instructor.toString() !== req.user.id) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await Lesson.findByIdAndDelete(req.params.id);
    await Course.findByIdAndUpdate(lesson.course, {
      $pull: { lessons: req.params.id },
    });

    // Delete related progress
    await Progress.deleteMany({ lesson: req.params.id });

    res.status(200).json({
      message: "Lesson deleted successfully",
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  createLesson,
  getLessonsByCourse,
  getLessonById,
  updateLesson,
  deleteLesson,
};
