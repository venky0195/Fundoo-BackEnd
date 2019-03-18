const nodemailer = require("nodemailer");

exports.sendEMailFunction = url => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.userName,
      pass: process.env.Password
    }
  });
  const mailOptions = {
    from: process.env.userName, // sender address
    to: process.env.userName, // receiver address
    subject: "Fundoo reset password link", // Subject line
    text: "Click on the below link to reset your password:\n\n" + url
  };
  transporter.sendMail(mailOptions, (err, info) => {
    if (err) console.log("error while sending mails-- ", err);
    else console.log("result on sending mails-- ", info);
  });
};
