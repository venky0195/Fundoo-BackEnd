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
 * @description:Creating notification schema using mongoose
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
        console.log("success", result);
        return callback(null, result);
      }
    }
  );
};

NotificationModel.prototype.sendPushNotification = (user_id, callback) => {
  pushNotification.findOne(
    {
      userId: user_id
    },
    (err, result) => {
      if (err) {
        console.log("Error", err);
        callback(err);
      } else {
        console.log("Success..Push token is --->", result.pushToken);
        return callback(null, result.pushToken);
      }
    }
  );
};

module.exports = new NotificationModel();
