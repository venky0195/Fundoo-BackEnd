var jwt = require("jsonwebtoken");
exports.checkToken = (req, res, next) => {
  console.log("request in authentication", req.body);

  var token1 = req.headers["token"];
  
  //console.log("token-------->", token1);
  if (token1) {
    jwt.verify(token1, "secretkey-auth", (err, decoded) => {
      if (err) {
        return res.status(401).send({
          success: false,
          message: "Please provide valid token"
        });
        console.log("NOT VALID TOKEN");
      } else {
        console.log("VALID TOKEN");
        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.send({
      success: false,
      message: "No token provided."
    });
  }
};
exports.resetToken = (req, res, next) => {
  console.log("request in authentication", req.body);

  var token1 = req.headers["token"];

  if (token1) {
    jwt.verify(token1, "secretkey", (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          message: "Token is not valid"
        });
        console.log("NOT VALID TOKEN");
      } else {
        console.log("VALID TOKEN");

        req.decoded = decoded;
        next();
      }
    });
  } else {
    return res.send({
      success: false,
      message: "No token provided."
    });
  }
};
