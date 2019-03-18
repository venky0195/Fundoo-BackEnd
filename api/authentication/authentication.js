var jwt = require("jsonwebtoken");
exports.checkToken = (req, res, next) => {
  console.log("request in authentication", req.body);

  var token1 = req.headers["token"];

  if (token1) {
    jwt.verify(token1, "secretkey", (err, decoded) => {
      if (err) {
        return res.send({
          success: false,
          message: "Token is not valid"
        });
      } else {
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
