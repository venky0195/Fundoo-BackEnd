const express = require("express");
const router = express.Router();
// Import user controller, authentication
const userController = require("../controllers/user.controllers");
const middle = require("../authentication/authentication");
const upload = require("../../middleware/fileUpload");

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
router.put(
  "/setProfilePic",
  middle.checkToken,
  upload.single("image"),
  userController.setProfilePic
);

// Export API routes
module.exports = router;
