const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');

const app = express();
const router = express.Router();

// view engine setup
app.use(express.static("views"));       // Allow access to content of views folder
app.use(express.static("scripts"));     // Allow access to scripts folder
app.use(express.static("images"));      // Allow access to images folder

var indexRouter = require('./routes/index');
app.use('/', indexRouter);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const db = config.get('mongoURI'); //need to set up config folder and line 3

mongoose.connect(db, { 
	useNewUrlParser: true, 
	useCreateIndex: true, 
	useFindAndModify: false 
	})
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

/* GET home page. */
//app.get('/', function(req, res, next) {
//  res.render('index.ejs', { title: 'Express' });
//});


// We need to set the requirements for the application to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!");
});
