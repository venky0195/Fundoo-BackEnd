/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.model.js
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 ******************************************************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
var AutoIncrement = require("mongoose-sequence")(mongoose);

/**
 * @description:Creating note schema using mongoose
 **/
var noteSchema = new Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User_id required"],
      ref: "Note"
    },
    title: {
      type: String,
      required: [true, "Title required"]
    },
    description: {
      type: String,
      required: [true, "Description required"]
    },
    color: {
      type: String,
      required: [true, "Color required"]
    },
    reminder: {
      type: String
    },
    archive: {
      type: Boolean
    },
    trash: {
      type: Boolean
    },
    label: [
      {
        type: String,
        ref: "labelSchema"
      }
    ],
    sequence: {
      type: Number
    }
  },
  {
    timestamps: true
  }
);
noteSchema.plugin(AutoIncrement, { id: "sequence_seq", inc_field: "sequence" });
var note = mongoose.model("Note", noteSchema);

function noteModel() {}
function sample() {}
/**
 * @description:it will add the notes data using note schema and save the data into the database
 * @param {*request from frontend} objectNote
 * @param {*response to backend} callback
 */
noteModel.prototype.addNotes = (objectNote, callback) => {
  console.log("data====>", objectNote.body);
  const noteModel = new note(objectNote.body);
  noteModel.save((err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
/**
 * @description:it will get the notes using email and find the notes with data
 * @param {*request from frontend} id
 * @param {*response to backend} callback
 */
noteModel.prototype.getNotes = (id, callback) => {
  // console.log("id is---------------------->", id.decoded);
  note.find(
    {
      userId: id.decoded.payload.user_id
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        callback(null, result);
      }
    }
  );
};
/**
 * @description: To update the color of the note
 * @param {*} noteID
 * @param {*} updateParams
 * @param {*} callback
 */
noteModel.prototype.updateColor = (noteID, updateParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        color: updateParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, updateParams);
      }
    }
  );
};

noteModel.prototype.reminder = (noteID, reminderParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        reminder: reminderParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, reminderParams);
      }
    }
  );
};

noteModel.prototype.isArchived = (noteID, archiveNote, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        archive: archiveNote
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, archiveNote);
      }
    }
  );
};

noteModel.prototype.isTrashed = (noteID, trashNote, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        trash: trashNote
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, trashNote);
      }
    }
  );
};
noteModel.prototype.deleteNote = (data, callback) => {
  note.deleteOne(
    {
      _id: data.body.noteID
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        const obj = {
          status: 200,
          msg: "note is deleted successfully"
        };
        return callback(null, obj);
      }
    }
  );
};
noteModel.prototype.updateTitle = (noteID, titleParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        title: titleParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, titleParams);
      }
    }
  );
};

noteModel.prototype.updateDescription = (noteID, descParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        description: descParams
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, descParams);
      }
    }
  );
};
/**
 * @description:it will pin or unpin the notes
 * @param {*request from frontend} noteID
 * @param {*request from frontend} pinParams
 * @param {*response to backend} callback
 */
noteModel.prototype.isPinned = (noteID, pinParams, callback) => {
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $set: {
        pinned: pinParams,
        trash: false,
        archive: false
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        return callback(null, pinParams);
      }
    }
  );
};
/**
 * @description:Creating label schema using mongoose
 **/
var labelSchema = new mongoose.Schema(
  {
    userID: {
      type: Schema.Types.ObjectId,
      ref: "labelSchema"
    },
    label: {
      type: String,
      require: [true, "Label required"],
      unique: true
    }
  },
  {
    timestamps: true
  }
);
var label = mongoose.model("Label", labelSchema);

noteModel.prototype.addLabel = (labelData, callback) => {
  console.log("label save", labelData);
  const data = new label(labelData);
  data.save((err, result) => {
    if (err) {
      console.log(err);
      callback(err);
    } else {
      console.log("labels", result);
      return callback(null, result);
    }
  });
};

noteModel.prototype.getLabels = (id, callback) => {
  //-console.log("in getlabels of model", id);
  label.find({ userID: id.userID }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      //  console.log("labels", result);
      return callback(null, result);
    }
  });
};

noteModel.prototype.deleteLabel = (id, callback) => {
  console.log("in deletelabel of model", id);
  label.deleteOne({ _id: id.labelID }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      console.log("labels", result);
      return callback(null, result);
    }
  });
};

noteModel.prototype.updateLabel = (changedLabel, callback) => {
  var editLabel = null;
  var labelId = null;
  console.log("in updatelabel of  model", changedLabel);
  if (changedLabel != null) {
    editLabel = changedLabel.editLabel;
    labelId = changedLabel.labelID;
  } else {
    callback("Update label");
  }
  label.findOneAndUpdate(
    {
      _id: labelId
    },
    {
      $set: {
        label: editLabel
      }
    },
    (err, result) => {
      if (err) {
        console.log("in modelerr");
        callback(err);
      } else {
        console.log("in update label modelsuccess");
        return callback(null, changedLabel);
      }
    }
  );
};

noteModel.prototype.saveLabelToNote = (labelParams, callback) => {
  console.log("in save label to note model", labelParams);
  var labelledNote = null;
  var noteID = null;
  if (labelParams != null) {
    labelledNote = labelParams.label;
    noteID = labelParams.noteID;
  } else {
    callback("NodeId should not be null");
  }
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $push: {
        label: labelledNote
      }
    },
    (err, result) => {
      if (err) {
        console.log("error in save label to note in model", err);

        callback(err);
      } else {
        //console.log("in model success",result);
        let res = result.label;

        res.push(labelledNote);
        console.log("RES IS ", res);

        return callback(null, res);
      }
    }
  );
};

noteModel.prototype.deleteLabelToNote = (labelParams, callback) => {
  console.log("in delete label to note model", labelParams);
  var labelledNote = null;
  var noteID = null;
  if (labelParams != null) {
    labelledNote = labelParams.label;
    noteID = labelParams.noteID;
    //console.log("LABEL PARAMS VALUE",labelParams.label);
  } else {
    callback("NodeId should not be null");
  }
  note.findOneAndUpdate(
    {
      _id: noteID
    },
    {
      $pull: {
        label: labelledNote
      }
    },
    (err, result) => {
      if (err) {
        callback(err);
      } else {
        let newArray = result.label;
        console.log("in model success result", result.label);

        for (let i = 0; i < newArray.length; i++) {
          if (newArray[i] === labelledNote) {
            newArray.splice(i, 1);
            console.log("FINAL ARRAY IS ", newArray);

            return callback(null, newArray);
          }
        }
      }
    }
  );
};

noteModel.prototype.getReminders = (d1, d2, callback) => {
  // console.log("id is---------------------->", id.decoded);
  note.find((err, result) => {
    if (err) {
      callback(err);
    } else {
      const details = [];
      result.forEach(function(value) {
        if (value.reminder.length > 1) {
          // console.log("original is "+d1+" < "+value.reminder+"==="+ (d1<value.reminder)       );
          if (value.reminder >= d1 && value.reminder <= d2) {
            userIdReminder = [
              value.userId + ", " + value.title + ", " + value.description
            ];
            console.log("IN IF---------->", userIdReminder);
            details.push(userIdReminder);
          }
        }
      });
      // console.log("DETAILS+++", details);
      //  details.filter(item => item.trim() !== '')
      if (details.length > 0) {
        callback(null, details);
      } else {
        callback(null, "No reminders found");
      }
    }
  });
};

module.exports = new noteModel();
