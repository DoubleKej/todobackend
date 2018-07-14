var express = require('express');
var app = express();
var mongoose = require('mongoose');
// var config = require('./config.json');
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());



var categoryController = require('./APIs/categoryController');

// app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
// app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extend : true }));
// app.use(express.static('./public'));

categoryController(app);



app.listen(8000);
console.log('Server running at port 8000');