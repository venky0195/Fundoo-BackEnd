var admin = require("firebase-admin");

var serviceAccount = require("./fundoo-notess-firebase-adminsdk-hp13s-20ba4a3d2e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fundoo-notess.firebaseio.com"
});

var registrationToken =
  "dnCcwvjoHj8:APA91bEvmA8Ah21b8Kcwvccr9CADky3rN-Y0eU6j_Z7bx_eRsj6p-_dbJzpULPfaG5aDpuYBMfCyozDestc-rcBuRqCITttPAwwlk3suMAs3eAo7rVVWvJ83hW-ats5Vp32Y0__6WOs1";

var payload = {
  data: {
    Title: "HelloWorld!!!!"
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
