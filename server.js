/******************************************************************************
import { firebase } from 'firebase/app';
 *  @Purpose        : To create a server to connect with front end for getting 
                     request and sending response to client
 *  @file           : server.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 09-03-2019
 ******************************************************************************/
// Import API routers
const UserRouter = require("./api/routes/UserRouter");
const NoteRouter = require("./api/routes/NoteRouter");

// Import express
const express = require("express");
// Import Body parser
var bodyParser = require("body-parser");
// create express app
const app = express();
app.use(bodyParser.json());
/********************************************************/

var admin = require("firebase-admin");

var serviceAccount = require("./fundoo-notess-firebase-adminsdk-hp13s-20ba4a3d2e.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://fundoo-notess.firebaseio.com"
});

var registrationToken =
  "dnCcwvjoHj8:APA91bEvmA8Ah21b8Kcwvccr9CADky3rN-Y0eU6j_Z7bx_eRsj6p-_dbJzpULPfaG5aDpuYBMfCyozDestc-rcBuRqCITttPAwwlk3suMAs3eAo7rVVWvJ83hW-ats5Vp32Y0__6WOs1";

var payload = {
  notification: {
    title: "Fundoo notification check",
    body: "Working"
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
/***************************************************************/
// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

//To perform validations
var expressValidator = require("express-validator");
app.use(expressValidator());

// Configuring the database
const databaseConfig = require("./configuration/database.configuration");

require("dotenv").config();
// Import Mongoose
const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

// Connecting to the database
mongoose
  .connect(databaseConfig.url, {
    useNewUrlParser: true
  })
  .then(() => {
    console.log("Successfully connected to the database");
  })
  .catch(err => {
    console.log("Could not connect to the database.", err);
    process.exit();
  });

require("http").createServer(app);
app.use("/", UserRouter);
app.use("/", NoteRouter);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Fundoo App"
  });
});

// listen for requests
const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

module.exports = app;
