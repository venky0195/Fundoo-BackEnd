/*****************************************************************************************
 *  @Purpose        : To create note controller to validate and handle the incoming data.
 *  @file           : note.controller.js
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 *****************************************************************************************/
const noteService = require("../services/note.services");
const redisNotes = require("../services/redis.services");

/**
 * @description:it handles the creating note data
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.createNote = (req, res) => {
  try {
    req
      .checkBody("title", "Title should not be empty")
      .not()
      .isEmpty();
    req
      .checkBody("description", "Description should not be empty")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteService.createNote(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Failed to create note";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          var userNote = {
            note: result
          };
          responseResult.status = true;
          responseResult.message = "New note created";
          responseResult.data = userNote;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 * @description:it handles get the created note with data
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.getNotes = (req, res) => {
  try {
    // console.log("note Controller", req);
    var responseResult = {};
    const userId = req.decoded.payload.user_id;
    redisNotes.getNotes(userId, (err, result) => {
      // If that key exist in Redis store
      if (result) {
        const resultJSON = JSON.parse(result);
        // console.log("RESULT JSON IS ", resultJSON);
        responseResult.status = true;
        responseResult.message = "List of notes from redis cache:";
        responseResult.data = resultJSON;
        res.status(200).send(responseResult);
      }
      // Key does not exist in Redis store
      // Fetch directly from notesRedis API
      else {
        noteService.getNotes(req, (err, result) => {
          if (result) {
            redisNotes.addNotestoRedis(result, userId);
            responseResult.status = true;
            responseResult.message = "List of notes from database:";
            responseResult.data = result;
            res.status(200).send(responseResult);
          } else {
            responseResult.status = false;
            responseResult.message = "Failed to generate note";
            responseResult.error = err;
            res.status(500).send(responseResult);
          }
        });
      }
    });
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description: To update the background color of the note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */
exports.updateColor = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("color", "color should not be empty")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      const responseResult = {};
      noteID = req.body.noteID;
      color = req.body.color;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);
      noteService.updateColor(noteID, color, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description: To set the reminder for the note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */

exports.reminder = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      reminder = req.body.reminder;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);
      noteService
        .reminder(noteID, reminder)
        .then(result => {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        })
        .catch(error => {
          responseResult.status = false;
          responseResult.error = error;
          res.status(500).send(responseResult);
        });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description: To archive the note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */
exports.isArchived = (req, res) => {
  try {
    console.log("In note controller isArchived,", req.body);

    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("archive", "archive required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      archive = req.body.archive;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);
      noteService.isArchived(noteID, archive, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description: To trash the note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */
exports.isTrashed = (req, res) => {
  try {
    console.log("In note controller isTrashed,", req.body);

    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("trash", "trash required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      trash = req.body.trash;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.isTrashed(noteID, trash, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 *  @description: To delete the note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */
exports.deleteNote = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      // noteID = req.body.noteID;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.deleteNote(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description: To update the title of particular note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */
exports.updateTitle = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("title", "title required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      title = req.body.title;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.updateTitle(noteID, title, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description: To update the title of particular note
 * @param {*request from backend} req
 * @param {*response from backend} res
 */
exports.updateDescription = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    req
      .checkBody("description", "description required")
      .not()
      .isEmpty();

    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      description = req.body.description;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.updateDescription(noteID, description, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description:It handles the pinned notes
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.isPinned = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      pinned = req.body.pinned;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.isPinned(noteID, pinned, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

/**
 * @description:It adds the label
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.addLabel = (req, res) => {
  try {
    req
      .checkBody("label", "label required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        userID: req.decoded.payload.user_id,
        label: req.body.label
      };
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.addLabel(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description:It returns all the labels present in the database
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.getLabels = (req, res) => {
  try {
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        userID: req.decoded.payload.user_id
      };
      noteService.getLabels(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description:It deletes the label from the database
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.deleteLabel = (req, res) => {
  try {
    req
      .checkBody("labelID", "labelID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;

      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        labelID: req.body.labelID
      };
      console.log("Label data===>", labelData);
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.deleteLabel(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description:It updates the label
 * @param {*request from frontend} req
 * @param {*response from backend} res
 */
exports.updateLabel = (req, res) => {
  console.log("HERE");

  try {
    req
      .checkBody("labelID", "labelID required")
      .not()
      .isEmpty();
    req
      .checkBody("editLabel", "editLabel required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      const labelData = {
        editLabel: req.body.editLabel,
        labelID: req.body.labelID
      };
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.updateLabel(labelData, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = "Make some changes";
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description:It handles the save labels to notes
 * @param {*request from frontend} req
 * @param {*response to backend} res
 */
exports.saveLabelToNote = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      //noteID = req.body.noteID;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.saveLabelToNote(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
/**
 * @description:It handles the delete labels from notes
 * @param {*request from frontend} req
 * @param {*response to backend} res
 */
exports.deleteLabelToNote = (req, res) => {
  try {
    req
      .checkBody("noteID", "noteID required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteID = req.body.noteID;
      const userId = req.decoded.payload.user_id;
      redisNotes.deleteRedisKey(userId);

      noteService.deleteLabelToNote(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};
exports.pushNotification = (req, res) => {
  try {
    console.log(
      "Reqest from backend in pushNotification==================",
      req.body
    );
    req
      .checkBody("pushToken", "pushToken required")
      .not()
      .isEmpty();
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      noteService.pushNotification(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.data = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (error) {
    res.send(error);
  }
};

exports.sendPushNotification = (req, res) => {
  try {
    console.log("USER ID GIVEN IS ", req.params.userid);

    var responseResult = {};
    var user_id = req.params.userid;
    noteService.sendPushNotification(user_id, (err, result) => {
      if (err) {
        responseResult.status = false;
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        responseResult.status = true;
        responseResult.data = "Notification sent successfully!!";
        res.status(200).send(responseResult);
      }
    });
  } catch (error) {
    res.send(error);
  }
};
