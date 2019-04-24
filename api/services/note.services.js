/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                    to noteModel and save that data to database.
 *  @file           : note.services.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 ******************************************************************************/
const noteModel = require("../model/note.model");
const NotificationModel = require("../model/pushNotification.model")

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
          callback(err)
      } else {
          return callback(null, result)
      }
  })
}

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
/**
 * @description:it will send pinned data to model
 * @param {*request from frontend} paramID 
 * @param {*request from frontend} paramData 
 * @param {*response to backend} callback 
 */
exports.isPinned = (paramID, paramData, callback) => {
  noteModel.isPinned(paramID, paramData, (err, result) => {
      if (err) {
          console.log("service error");
          callback(err);
      } else {
          return callback(null, result)
      }
  })
}
exports.pushNotification=(req, callback) =>{





  NotificationModel.updatePushNotification(req, (err, result)=>{


    if(err){
      console.log("service error");
      callback(err);      
    }
    else{
      return callback(null, result)
    }
  })
}