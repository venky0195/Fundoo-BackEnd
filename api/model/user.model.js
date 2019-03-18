/**
 * Requiring Bcrypt to create hash of the user password stored in database
 **/
const bcrypt = require("bcrypt");
/**
 * Creating user schema using mongoose
 **/
const mongoose = require("mongoose");
let saltRounds = 10;
const UserSchema = mongoose.Schema(
  {
    firstName: {
      type: String,
      required: [true, "Firstname required"]
    },
    lastName: {
      type: String,
      required: [true, "Lastname required"]
    },
    email: {
      type: String,
      required: [true, "email required"]
    },
    password: {
      type: String,
      required: [true, "password required"]
    }
  },
  {
    timestamps: true
  }
);
var user = mongoose.model("User", UserSchema);

function userModel() {}

function hash(password) {
  var pass = bcrypt.hashSync(password, saltRounds);
  return pass;
}

function userModel() {}
userModel.prototype.login = (body, callback) => {
  user.findOne({ email: body.email }, (err, result) => {
    console.log("In model, data==>", result);
    if (err) {
      callback(err);
    } else if (result != null) {
      /**
       * Create hash value of user password
       **/
      bcrypt.compare(body.password, result.password).then(res => {
        if (res) {
          console.log("Login Successful");
          callback(null, res);
        } else {
          console.log("Incorrect password");
          callback("Incorrect password");
        }
      });
    } else {
      console.log("invalid user");
      callback("invalid user");
    }
  });
};
/**
 * Saving data into database using the user schema
 **/
userModel.prototype.registration = (body, callback) => {
  user.find(
    {
      email: body.email
    },
    (err, data) => {
      if (err) {
        console.log("Error in registration");
        callback(err);
      } else {
        if (data.length > 0) {
          console.log("Email already exists");
          callback("User already present");
        } else {
          var newUser = new user({
            firstName: body.firstName,
            lastName: body.lastName,
            email: body.email,
            password: hash(body.password)
          });
          newUser.save((err, result) => {
            if (err) {
              console.log("Model not found");
              callback(err);
            } else {
              console.log("Registered Successfully");
              callback(null, result);
            }
          });
        }
      }
    }
  );
};

userModel.prototype.forgotPassword = (data, callback) => {
  user.findOne({ email: data.body.email }, (err, result) => {
    if (err) {
      callback(err);
    } else {
      if (result !== null) {
        //  console.log("model===>", result);
        callback(null, result);
      } else {
        callback("incorrect mail");
      }
    }
  });
};
userModel.prototype.updateUserPassword = (req, callback) => {
  let newPassword = bcrypt.hashSync(req.body.password, saltRounds);
  console.log("new pass bcrypt--", newPassword);
  user.updateOne(
    { _id: req.decoded.payload.user_id },
    { password: newPassword },
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
 * get all users into the database using find()
 */
userModel.prototype.getAllUser = callback => {
  user.find({}, (err, result) => {
    if (err) {
      callback(err);
    } else {
      console.log("In model====", result);
      callback(null, result);
    }
  });
};

module.exports = new userModel();
