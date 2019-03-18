const userService = require("../services/user.services");
const token = require("../../middleware/token");
const sendMail = require("../../middleware/nodemailer");

/**
 * @param {*} req
 * @param {*} res
 */
exports.login = (req, res) => {
  try {
    console.log("In login controller", req.body);
    req.checkBody("email", "Invaild Email").isEmail();
    req.checkBody("password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.login(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Login Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Login Successful";
          responseResult.result = result;
          const payload = {
            user_id: result._id
          };
          const obj = token.GenerateToken(payload);
          responseResult.token = obj;
          
          console.log("token details==> ", responseResult.token.token);
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 * @param {*} req
 * @param {*} res
 */
exports.registration = (req, res) => {
  try {
    req
      .checkBody("firstName", "Invaild Firstname")
      .isLength({
        min: 3
      })
      .isAlpha();
    req
      .checkBody("lastName", "Invaild Lastname")
      .isLength({
        min: 1
      })
      .isAlpha();
    req.checkBody("email", "Invaild Email").isEmail();
    req.checkBody("password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.registration(req.body, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Registration Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Registration Successful";
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 * @param {*} req
 * @param {*} res
 */
exports.forgotPassword = (req, res) => {
  try {
    req.checkBody("email", "Invaild Email").isEmail();
    var errors = req.validationErrors();
    var responseResult = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.forgotPassword(req, (err, result) => {
        if (err) {
          responseResult.status = false;
          responseResult.message = "Request Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          responseResult.status = true;
          responseResult.message = "Request Processed";
          responseResult.result = result;
          console.log("Data in controller==>", result._id);
          const payload = {
            user_id: result._id
          };
          const obj = token.GenerateToken(payload);
          console.log("Token is ", obj);
          const url = `http://localhost:3000/resetPassword/${obj.token}`;
          sendMail.sendEMailFunction(url);
          res.status(200).send(url);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 * @param {*} req
 * @param {*} res
 */
exports.setPassword = (req, res) => {
  try {
    req.checkBody("password", "Invaild Password").isLength({
      min: 6
    });
    var errors = req.validationErrors();
    var response = {};
    if (errors) {
      response.status = false;
      response.error = errors;
      return res.status(422).send(response);
    } else {
      var responseResult = {};
      userService.resetpassword(req, (err, result) => {
        if (err) {
          responseResult.success = false;
          responseResult.message = "Reset Password Failed";
          responseResult.error = err;
          res.status(500).send(responseResult);
        } else {
          console.log("in user controller token is verified giving response");
          responseResult.success = true;
          responseResult.result = result;
          res.status(200).send(responseResult);
        }
      });
    }
  } catch (err) {
    res.send(err);
  }
};
/**
 * @param {*} req
 * @param {*} res
 */
exports.getAllUsers = (req, res) => {
  try {
    var responseResult = {};
    userService.getAllUsers((err, result) => {
      if (err) {
        responseResult.success = false;
        responseResult.error = err;
        res.status(500).send(responseResult);
      } else {
        responseResult.success = true;
        responseResult.result = result;
        res.status(200).send(responseResult);
      }
    });
  } catch (err) {
    res.send(err);
  }
};
