/******************************************************************************
 *  @Purpose        : To create a note schema and store data into database.
 *  @file           : note.model.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 26-03-2019
 ******************************************************************************/
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * @description:Creating note schema using mongoose
 **/
var noteSchema = new mongoose.Schema({
    userId: {
        type: Schema.Types.ObjectId,
        required: [true, "User_id required"],
        ref: 'Note'
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
}, {
    timestamps: true
});
var note = mongoose.model('Note', noteSchema);

function noteModel() {}
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
    })
}
/**
 * @description:it will get the notes using email and find the notes with data
 * @param {*request from frontend} id 
 * @param {*response to backend} callback 
 */
noteModel.prototype.getNotes = (id, callback) => {
    note.find({
        email: id.decoded.payload.email
    }, (err, result) => {
        if (err) {
            callback(err)
        } else {
            callback(null, result)
        }
    })
}
/**
 * @description: To update the color of the note
 * @param {*} noteID 
 * @param {*} updateParams 
 * @param {*} callback 
 */
noteModel.prototype.updateColor = (noteID, updateParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                color: updateParams
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, updateParams);
            }
        });
};

noteModel.prototype.reminder = (noteID, reminderParams, callback) => {
    note.findOneAndUpdate({
            _id: noteID
        }, {
            $set: {
                reminder: reminderParams
            }
        },
        (err, result) => {
            if (err) {
                callback(err)
            } else {
                return callback(null, reminderParams)
            }
        });
};

module.exports = new noteModel();