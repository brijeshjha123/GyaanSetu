const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const courseController = require("../controllers/course.controller");

// Public routes
router.get("/", courseController.getAllCourses);
router.get("/:id", courseController.getCourseById);

// Protected routes - Instructor
router.post("/", authMiddleware, authorize("instructor"), courseController.createCourse);
router.put("/:id", authMiddleware, authorize("instructor"), courseController.updateCourse);
router.delete("/:id", authMiddleware, authorize("instructor"), courseController.deleteCourse);
router.get("/instructor/my-courses", authMiddleware, authorize("instructor"), courseController.getInstructorCourses);

module.exports = router;
