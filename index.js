'use strict';

let express = require('express');
let bodyParser = require('body-parser');
let mongoose = require('mongoose');
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

app.use(bodyParser.urlencoded({extended: true })); 
app.use(bodyParser.json());

routes(app);

app.listen(port);


console.log('Old-driver server started on: ' + port);