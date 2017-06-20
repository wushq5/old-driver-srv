'use strict';

let path = require('path');
let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
let formidable = require('express-formidable');
let routes = require('./routes');
let app = express();
let port = process.env.PORT || 3000;


let db = mongoose.connect('mongodb://localhost:27017/old-driver');
db.connection.on("error", (error) => {
	console.log("Database connect error: " + error);
});
db.connection.on("open", () => {
	console.log("Database connect success!");
});

// deal with img post
app.use(formidable({
  uploadDir: path.join(__dirname, 'upload'),
  keepExtensions: true
}));

app.use(bodyParser.urlencoded({extended: true })); 
app.use(bodyParser.json());

//设置跨域访问
app.all('*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Content-Type,X-Requested-With");
  res.header("Access-Control-Allow-Methods","PUT,POST,GET,DELETE,OPTIONS");
  res.header("X-Powered-By",' 3.2.1')
  res.header("Content-Type", "application/json;charset=utf-8");
  next();
});

routes(app);

app.listen(port);


console.log('Old-driver server started on: ' + port);