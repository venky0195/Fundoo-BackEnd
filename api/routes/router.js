const express = require("express");
const router = express.Router();
// Import user controller
const userController = require("../controllers/user.controllers");
const noteController = require('../controllers/note.controllers')
const middle = require("../authentication/authentication");

// Contact routes
router.post("/", userController.login);
router.post("/login", userController.login);
router.post("/register", userController.registration);
router.post("/forgotPassword", userController.forgotPassword);
router.post(
  "/resetPassword/:token",
  middle.resetToken,
  userController.setPassword
);
router.post('/createNote', middle.checkToken, noteController.createNote);
router.get('/getNotes', middle.checkToken, noteController.getNotes);

// Export API routes
module.exports = router;
