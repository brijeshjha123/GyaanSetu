const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const assessmentController = require("../controllers/assessment.controller");

// ========== QUIZ ROUTES ==========

// Public routes
router.get("/quiz/course/:courseId", assessmentController.getQuizzesByCourse);
router.get("/quiz/:id", assessmentController.getQuizById);

// Protected routes - Instructor
router.post("/quiz", authMiddleware, authorize("instructor"), assessmentController.createQuiz);

// Protected routes - Student
router.post("/quiz/submit", authMiddleware, assessmentController.submitQuiz);

// Protected routes - Instructor
router.get("/quiz/:quizId/submissions", authMiddleware, authorize("instructor"), assessmentController.getQuizSubmissions);

// ========== ASSIGNMENT ROUTES ==========

// Public routes
router.get("/assignment/course/:courseId", assessmentController.getAssignmentsByCourse);

// Protected routes - Instructor
router.post("/assignment", authMiddleware, authorize("instructor"), assessmentController.createAssignment);
router.put("/assignment/:id/grade", authMiddleware, authorize("instructor"), assessmentController.gradeAssignment);
router.get("/assignment/:assignmentId/submissions", authMiddleware, authorize("instructor"), assessmentController.getAssignmentSubmissions);

// Protected routes - Student
router.post("/assignment/submit", authMiddleware, assessmentController.submitAssignment);

module.exports = router;
