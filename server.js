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

var schedule = require("node-schedule");
var j = schedule.scheduleJob("*/5 * * * * *", function() {
  console.log("The world is going to end today.");
  var d1 = new Date(),
    d2 = new Date(d1);
  d2.setMinutes(d1.getMinutes() + 1);
  d1.toString();
  d2.toString();
  console.log("Original date", d1);
  console.log("Plusone date ", d2);
});

module.exports = app;
