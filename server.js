/******************************************************************************
 *  @Purpose        : To create a server to connect with front end for getting 
                     request and sending response to client
 *  @file           : server.js        
 *  @author         : Venkatesh G
 *  @version        : v0.1
 *  @since          : 09-03-2019
 ******************************************************************************/
// Import API routers
const router = require("../server/api/routes/router");
// Import express
const express = require("express");
// Import Body parser
var bodyParser = require("body-parser");
// create express app
const app = express();

// Configure bodyparser to handle post requests
app.use(bodyParser.urlencoded({ extended: true }));

// parse requests of content-type - application/json
app.use(bodyParser.json());

//To perform validations
var expressValidator = require("express-validator");
app.use(expressValidator());

// Configuring the database
const databaseConfig = require("../server/configuration/database.configuration");

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
app.use("/", router);

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