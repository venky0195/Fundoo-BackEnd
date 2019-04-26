const admin = require("firebase-admin");

const serviceAccount = require("./fundoo-notess-firebase-adminsdk-hp13s-20ba4a3d2e.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fundoo-notess.firebaseio.com"
});

module.exports = {
  SendPushNotify(token, title, body) {
    var registrationToken = token;

    var payload = {
      notification: {
        title: title,
        body: body
      }
    };

    var options = {
      priority: "high",
      timeToLive: 60 * 60 * 24
    };
    admin
      .messaging()
      .sendToDevice(registrationToken, payload, options)
      .then(function(response) {
        console.log("Successfully sent message: ", response);
      })
      .catch(function(error) {
        console.log("Error sending message: ", error);
      });
  }
};
