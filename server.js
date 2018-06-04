var express = require('express');
var app = express();
var mongoose = require('mongoose');
var config = require('./config.json');
var cors = require('cors');
var bodyParser = require('body-parser')
app.use(cors());

var todoController = require('./controllers/todoController');

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())
app.use(express.static('./public'));

// mongoose.connect(config.connectionString, (err) => {
//     if (err) {
//       console.log(err);
//     } else {
//       console.log('Connect Success')
//     }
//   })

todoController(app);

// app.use(function (req, res, next) {
//     res.header('Access-Control-Allow-Origin', '*');
//     res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
//     next();
// });

app.listen(8000);
console.log('Server running at port 8000');