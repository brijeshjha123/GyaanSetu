const express = require("express");
const router = express.Router();
const { authMiddleware } = require("../middleware/auth");
const authController = require("../controllers/auth.controller");

// Public routes
router.post("/register", authController.register);
router.post("/login", authController.login);

// Protected routes
router.get("/verify", authMiddleware, authController.verifyToken);
router.get("/me", authMiddleware, authController.getCurrentUser);

module.exports = router;
