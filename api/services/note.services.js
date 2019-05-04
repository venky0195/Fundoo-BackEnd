/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                    to noteModel and save that data to database.
 *  @file           : note.services.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 ******************************************************************************/
const noteModel = require("../model/note.model");
const NotificationModel = require("../model/pushNotification.model");
var sendPush = require("../../send");
exports.createNote = (data, callback) => {
  noteModel.addNotes(data, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      console.log("In service");
      callback(null, result);
    }
  });
};

exports.getNotes = (data, callback) => {
  noteModel.getNotes(data, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      console.log("In service");
      callback(null, result);
    }
  });
};

exports.updateColor = (paramID, paramData, callback) => {
  // console.log("in services", paramID, paramData);
  noteModel.updateColor(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};
exports.reminder = (paramID, paramData, callback) => {
  noteModel.reminder(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};
exports.isArchived = (paramID, paramData, callback) => {
  console.log("in services", paramID, paramData);
  noteModel.isArchived(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};
exports.isTrashed = (paramID, paramData, callback) => {
  console.log("in trash services", paramID, paramData);
  noteModel.isTrashed(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};
exports.deleteNote = (noteID, callback) => {
  noteModel.deleteNote(noteID, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.updateTitle = (paramID, paramData, callback) => {
  console.log("in services", paramID, paramData);
  noteModel.updateTitle(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.updateDescription = (paramID, paramData, callback) => {
  console.log("in services", paramID, paramData);
  noteModel.updateDescription(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.isPinned = (paramID, paramData, callback) => {
  noteModel.isPinned(paramID, paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.addLabel = (labelData, callback) => {
  noteModel.addLabel(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.getLabels = (labelData, callback) => {
  noteModel.getLabels(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.deleteLabel = (labelData, callback) => {
  noteModel.deleteLabel(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.updateLabel = (labelData, callback) => {
  noteModel.updateLabel(labelData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.saveLabelToNote = (paramData, callback) => {
  if (paramData.pull) {
    noteModel.deleteLabelToNote(paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
else {
    noteModel.saveLabelToNote(paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}
}

exports.deleteLabelToNote = (paramData, callback) => {
  noteModel.deleteLabelToNote(paramData, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.pushNotification = (req, callback) => {
  NotificationModel.updatePushNotification(req, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      return callback(null, result);
    }
  });
};

exports.sendPushNotification = (user_id, callback) => {
  NotificationModel.sendPushNotification(user_id, (err, result) => {
    if (err) {
      console.log("service error");
      callback(err);
    } else {
      console.log("IN SERVICE RESUT OF SEND NOTIFICATION IS ", result);
      sendPush.SendPushNotify(result);
      return callback(null, result);
    }
  });
};

/**
 * @description: Here we create 1 current date-time object and create another object by adding one minute extra to it.
 *               Passing the date objects to the model.
 */

exports.checkForReminders = () => {
  var d1 = new Date(),
    d2 = new Date(d1);
  d2.setMinutes(d1.getMinutes() + 1);
  d1 = d1.toLocaleString();
  d2 = d2.toLocaleString();
  noteModel.getReminders(d1, d2, (err, result) => {
    if (err) {
      console.log("Service error");
    } else {
      console.log("In service result is ", result);
      if (Array.isArray(result)) {
        console.log("TEST ARRAY+++++++++++++++++++++++", result[0][0]);
        var temp = result[0][0].split(",");
        var userId = temp[0];
        var title = temp[1];
        var body = temp[2];
        NotificationModel.sendPushNotification(userId, (err, result) => {
          if (err) {
            console.log("service error");
          } else {
            console.log("IN SERVICE RESULT IS ", result);
            sendPush.SendPushNotify(result, title, body);
            // return callback(null, result);
          }
        });
      }
    }
  });
};
