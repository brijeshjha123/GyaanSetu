const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const lessonController = require("../controllers/lesson.controller");

// Public routes
router.get("/course/:courseId", lessonController.getLessonsByCourse);
router.get("/:id", lessonController.getLessonById);

// Protected routes - Instructor
router.post("/", authMiddleware, authorize("instructor"), lessonController.createLesson);
router.put("/:id", authMiddleware, authorize("instructor"), lessonController.updateLesson);
router.delete("/:id", authMiddleware, authorize("instructor"), lessonController.deleteLesson);

module.exports = router;
