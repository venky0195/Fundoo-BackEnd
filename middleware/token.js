const jwt = require("jsonwebtoken");

  exports.GenerateToken=(payload)=> {
    console.log("generate token generate");
    
    const token = jwt.sign({ payload }, "secretkey", { expiresIn: "5h" });
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  }

  exports.GenerateTokenAuth=(payload)=> {
    const token = jwt.sign({ payload }, "secretkey-auth", { expiresIn: "5h" });
    const obj = {
      success: true,
      message: "Token Generated Successfully!!",
      token: token
    };
    return obj;
  
};
