/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                    to noteModel and save that data to database.
 *  @file           : note.services.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 ******************************************************************************/
const noteModel = require('/home/admin1/Fundoo/server/api/model/note.model.js');

exports.createNote = (data, callback) => {
    noteModel.addNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            console.log("In service", result);
            callback(null, result);
        }
    });
}

exports.getNotes = (data, callback) => {
    noteModel.getNotes(data, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
        console.log("In service", result);
            callback(null, result);
        }
    });
}

exports.updateColor = (paramID, paramData, callback) => {
    // console.log("in services", paramID, paramData);
    noteModel.updateColor(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result);
        }
    })
}
exports.reminder = (paramID, paramData, callback) => {
    console.log("in services", paramID, paramData);
    noteModel.reminder(paramID, paramData, (err, result) => {
        if (err) {
            console.log("service error");
            callback(err);
        } else {
            return callback(null, result)
        }
    })
}