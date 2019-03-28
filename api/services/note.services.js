/******************************************************************************
 *  @Purpose        : To create note services that will send the incoming data 
                    to noteModel and save that data to database.
 *  @file           : note.services.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 ******************************************************************************/
const noteModel = require('/home/admin1/Fundoo/server/api/model/note.model.js');
/**
 * @param {*} data 
 * @param {*} callback 
 */
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
/**
 * @param {*} data 
 * @param {*} callback 
 */
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
