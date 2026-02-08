const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const progressController = require("../controllers/progress.controller");

// Protected routes
router.post("/", authMiddleware, progressController.updateLessonProgress);
router.get("/:enrollmentId", authMiddleware, progressController.getEnrollmentProgress);
router.get("/lesson/:lessonId/:enrollmentId", authMiddleware, progressController.getLessonProgress);

// Protected routes - Instructor
router.get("/course/:courseId", authMiddleware, authorize("instructor"), progressController.getCourseProgressSummary);

module.exports = router;
