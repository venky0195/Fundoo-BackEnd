// Import user model
const userModel = require("../model/user.model");
/**
 * @param {*} data
 * @param {*} callback
 */
exports.login = (data, callback) => {
  try {
    console.log("in user services:", data);
    userModel.login(data, (err, result) => {
      if (err) {
        console.log("service error");
        callback(err);
      } else {
        console.log("In service", result);
        callback(null, result);
      }
    });
  } catch (error) {
    callback.send(error);
  }
};
/**
 * @param {*} data
 * @param {*} callback
 */
exports.registration = (data, callback) => {
  try {
    userModel.registration(data, (err, result) => {
      if (err) {
        console.log("service error");
        callback(err);
      } else {
        console.log("In service", result);
        callback(null, result);
      }
    });
  } catch (error) {
    callback.send(error);
  }
};
/**
 * @param {*} data
 * @param {*} callback
 */
exports.forgotPassword = (data, callback) => {
  try {
    userModel.forgotPassword(data, (err, result) => {
      // console.log("result=====",result);

      if (err) {
        console.log("service error");
        callback(err);
      } else {
        console.log("In service", result);
        callback(null, result);
      }
    });
  } catch (error) {
    callback.send(error);
  }
};
/**
 * @param {*} req
 * @param {*} callback
 */
exports.resetPassword = (req, callback) => {
  try {
    userModel.updateUserPassword(req, (err, result) => {
      if (err) {
        console.log("service error");
        callback(err);
      } else {
        console.log("In service", result);
        callback(null, result);
      }
    });
  } catch (error) {
    callback.send(error);
  }
};
/**
 * @param {*} data
 * @param {*} callback
 */
exports.getAllUsers = (data, callback) => {
  userModel.getAllUser(data, (err, result) => {
    if (err) {
      callback(err);
    } else {
      callback(null, result);
    }
  });
};
