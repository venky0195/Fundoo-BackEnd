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
NoteRouter.put('/updateTitle', middle.checkToken, noteController.updateTitle);
NoteRouter.put('/updateDescription', middle.checkToken, noteController.updateDescription);
NoteRouter.post('/deleteNote', middle.checkToken, noteController.deleteNote);


// Export API routes
module.exports = NoteRouter;
