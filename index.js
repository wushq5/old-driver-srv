'use strict';

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let passport = require('passport');

let routes = require('./routes');
let config = require('config-lite')(__dirname);

let app = express();
let port = process.env.PORT || config.port;

let db = mongoose.connect(config.database);
db.connection.on("error", (error) => {
	console.log("Database connect error: " + error);
});
db.connection.on("open", () => {
	console.log("Database connect success!");
});

// init passport
app.use(passport.initialize());

// set assets path, GET /assets/demo.png
app.use('/assets', express.static('upload', {
  setHeaders: function(res, path) {
    res.type("jpg");
  }
}));

app.use(bodyParser.urlencoded({extended: true })); 
app.use(bodyParser.json());


// access-control
app.use((req, res, next) => {
  res.set("Access-Control-Allow-Origin", "*");
  res.set("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  res.set("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.set("X-Powered-By",' 3.2.1');
  res.set("Content-Type", "application/json;charset=utf-8");
  next();
});


routes(app);

app.listen(port);


console.log('Old-driver server started on: ' + port);