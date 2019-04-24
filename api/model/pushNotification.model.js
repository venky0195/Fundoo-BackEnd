/******************************************************************************
 *  @Purpose        : To create a pushNotification schema and store token and userID into database.
 *  @file           : pushNotification.model.js
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 24-04-2019
 ******************************************************************************/
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
/**
 * @description:Creating note schema using mongoose
 **/
var notificationSchema = new mongoose.Schema(
  {
    userId: {
      type: Schema.Types.ObjectId,
      required: [true, "User_id required"],
      ref: "noteSchema"
    },
    pushToken: {
      type: String,
      required: [true, "pushToken required"]
    }
  },
  {
    timestamps: true
  }
);
var pushNotification = mongoose.model("Push", notificationSchema);

function NotificationModel() {}

NotificationModel.prototype.updatePushNotification = (req, callback) => {
  pushNotification.findOneAndUpdate(
    {
      userId: req.body.userId
    },
    {
      $set: {
        pushToken: req.body.pushToken
      }
    },
    { upsert: true, new: true },
    (err, result) => {
      if (err) {
        console.log("error");
        callback(err);
      } else {
        return callback(null, result);
        console.log("success", result);
      }
    }
  );
};

module.exports = new NotificationModel();
