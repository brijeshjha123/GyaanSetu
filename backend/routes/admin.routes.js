const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const adminController = require("../controllers/admin.controller");

// Protected routes - Admin only
router.get("/analytics", authMiddleware, authorize("admin"), adminController.getPlatformAnalytics);

// User management
router.get("/users", authMiddleware, authorize("admin"), adminController.getAllUsers);
router.put("/users/:userId/toggle-status", authMiddleware, authorize("admin"), adminController.toggleUserStatus);
router.delete("/users/:userId", authMiddleware, authorize("admin"), adminController.deleteUser);

// Course management
router.get("/courses/pending", authMiddleware, authorize("admin"), adminController.getPendingCourses);
router.put("/courses/:courseId/approve", authMiddleware, authorize("admin"), adminController.approveCourse);
router.put("/courses/:courseId/reject", authMiddleware, authorize("admin"), adminController.rejectCourse);

// Category management
router.get("/categories", authMiddleware, authorize("admin"), adminController.getAllCategories);
router.post("/categories", authMiddleware, authorize("admin"), adminController.createCategory);
router.put("/categories/:categoryId", authMiddleware, authorize("admin"), adminController.updateCategory);
router.delete("/categories/:categoryId", authMiddleware, authorize("admin"), adminController.deleteCategory);

module.exports = router;
