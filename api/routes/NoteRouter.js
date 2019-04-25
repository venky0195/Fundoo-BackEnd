const express = require("express");
const NoteRouter = express.Router();
// Import note controller, authentication
const noteController = require("../controllers/note.controllers");
const middle = require("../authentication/authentication");

// Contact routes
NoteRouter.post("/createNote", middle.checkToken, noteController.createNote);
NoteRouter.get("/getNotes", middle.checkToken, noteController.getNotes);
NoteRouter.put("/updateColor", middle.checkToken, noteController.updateColor);
NoteRouter.put("/reminder", middle.checkToken, noteController.reminder);
NoteRouter.put("/isArchived", middle.checkToken, noteController.isArchived);
NoteRouter.put("/isTrash", middle.checkToken, noteController.isTrashed);
NoteRouter.put("/updateTitle", middle.checkToken, noteController.updateTitle);
NoteRouter.put(
  "/updateDescription",
  middle.checkToken,
  noteController.updateDescription
);
NoteRouter.post("/deleteNote", middle.checkToken, noteController.deleteNote);
NoteRouter.put("/isPinned", middle.checkToken, noteController.isPinned);
NoteRouter.post('/addLabel', middle.checkToken, noteController.addLabel);
NoteRouter.get('/getLabels', middle.checkToken, noteController.getLabels)
NoteRouter.post('/deleteLabel', middle.checkToken, noteController.deleteLabel);
NoteRouter.put('/updateLabel', middle.checkToken, noteController.updateLabel);

NoteRouter.post(
  "/pushNotification",
  middle.checkToken,
  noteController.pushNotification
);
NoteRouter.get("/sendPushNotification/:userid", noteController.sendPushNotification)

// Export API routes
module.exports = NoteRouter;
