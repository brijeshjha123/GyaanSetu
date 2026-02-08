const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const enrollmentController = require("../controllers/enrollment.controller");

// Protected routes - Student
router.post("/", authMiddleware, authorize("student"), enrollmentController.enrollCourse);
router.get("/", authMiddleware, authorize("student"), enrollmentController.getEnrolledCourses);
router.get("/:id", authMiddleware, enrollmentController.getEnrollmentDetails);

// Protected routes - Instructor
router.get("/course/:courseId", authMiddleware, authorize("instructor"), enrollmentController.getCourseEnrollments);
router.put("/:id", authMiddleware, enrollmentController.updateEnrollmentStatus);

module.exports = router;
