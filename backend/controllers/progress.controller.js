const Progress = require("../models/Progress");
const Enrollment = require("../models/Enrollment");
const Lesson = require("../models/Lesson");

// Update lesson progress
const updateLessonProgress = async (req, res) => {
  try {
    const { enrollmentId, lessonId, watchTimeSeconds, status } = req.body;

    if (!enrollmentId || !lessonId) {
      return res.status(400).json({
        message: "Enrollment ID and lesson ID are required",
      });
    }

    let progress = await Progress.findOne({
      enrollment: enrollmentId,
      lesson: lessonId,
    });

    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }

    if (watchTimeSeconds !== undefined) {
      progress.watchTimeSeconds = watchTimeSeconds;
    }

    if (status) {
      progress.status = status;
      if (status === "completed") {
        progress.completedAt = new Date();
      }
    }

    progress.lastAccessedAt = new Date();
    await progress.save();

    // Update enrollment progress
    const allProgress = await Progress.find({ enrollment: enrollmentId });
    const completedLessons = allProgress.filter(
      (p) => p.status === "completed"
    ).length;
    const completionPercentage = Math.round(
      (completedLessons / allProgress.length) * 100
    );

    await Enrollment.findByIdAndUpdate(enrollmentId, {
      completionPercentage,
      lastAccessedDate: new Date(),
      lastAccessedLesson: lessonId,
    });

    res.status(200).json({
      message: "Progress updated successfully",
      progress,
      completionPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get enrollment progress
const getEnrollmentProgress = async (req, res) => {
  try {
    const { enrollmentId } = req.params;

    const enrollment = await Enrollment.findById(enrollmentId);
    if (!enrollment) {
      return res.status(404).json({ message: "Enrollment not found" });
    }

    // Check authorization
    if (enrollment.student.toString() !== req.user.id) {
      const course = await (
        await Enrollment.findById(enrollmentId).populate("course")
      ).course;
      if (course.instructor.toString() !== req.user.id) {
        return res.status(403).json({ message: "Not authorized" });
      }
    }

    const progress = await Progress.find({ enrollment: enrollmentId }).populate(
      "lesson",
      "title duration order"
    );

    const completedCount = progress.filter(
      (p) => p.status === "completed"
    ).length;

    res.status(200).json({
      enrollment,
      progress,
      completedCount,
      totalLessons: progress.length,
      completionPercentage: enrollment.completionPercentage,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get lesson progress
const getLessonProgress = async (req, res) => {
  try {
    const { lessonId, enrollmentId } = req.params;

    const progress = await Progress.findOne({
      lesson: lessonId,
      enrollment: enrollmentId,
    }).populate("lesson");

    if (!progress) {
      return res.status(404).json({ message: "Progress record not found" });
    }

    res.status(200).json(progress);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// Get course progress summary (for instructor)
const getCourseProgressSummary = async (req, res) => {
  try {
    const { courseId } = req.params;

    const enrollments = await Enrollment.find({ course: courseId });

    const progressData = await Promise.all(
      enrollments.map(async (enrollment) => {
        const progress = await Progress.find({ enrollment: enrollment._id });
        const completed = progress.filter((p) => p.status === "completed").length;

        return {
          enrollmentId: enrollment._id,
          studentId: enrollment.student,
          completionPercentage: enrollment.completionPercentage,
          completedLessons: completed,
          totalLessons: progress.length,
          enrollmentDate: enrollment.enrollmentDate,
        };
      })
    );

    res.status(200).json({
      courseId,
      totalEnrollments: enrollments.length,
      averageCompletion:
        enrollments.length > 0
          ? Math.round(
              enrollments.reduce((sum, e) => sum + e.completionPercentage, 0) /
                enrollments.length
            )
          : 0,
      progressData,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = {
  updateLessonProgress,
  getEnrollmentProgress,
  getLessonProgress,
  getCourseProgressSummary,
};
