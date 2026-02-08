const express = require("express");
const router = express.Router();
const { authMiddleware, authorize } = require("../middleware/auth");
const userController = require("../controllers/user.controller");

// Protected routes
router.get("/profile", authMiddleware, userController.getUserProfile);
router.put("/profile", authMiddleware, userController.updateUserProfile);
router.put("/change-password", authMiddleware, userController.changePassword);

// Admin routes
router.get("/", authMiddleware, authorize("admin"), userController.getAllUsers);
router.get("/:id", authMiddleware, authorize("admin"), userController.getUserById);

module.exports = router;
