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
// useNewUrlParser: true==> Mongoose lets you start using your models immediately,
// without waiting for mongoose to establish a connection to MongoDB.
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
//useCreateIndex - False by default. Set to true to make Mongoose's default index build use createIndex()
// instead of ensureIndex() to avoid deprecation warnings from the MongoDB driver.
mongoose.set("useCreateIndex", true);

require("http").createServer(app);
app.use("/", UserRouter);
app.use("/", NoteRouter);

// define a simple route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Fundoo App"
  });
});
const noteService = require("./api/services/note.services");
// listen for requests
const server = app.listen(4000, () => {
  console.log("Server is listening on port 4000");
});

//Scheduling job to fetch reminders and notify
var schedule = require("node-schedule");
var j = schedule.scheduleJob("*/1 * * * *", function() {
  noteService.checkForReminders();
});

module.exports = app;
