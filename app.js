const express = require('express');
const mongoose = require('mongoose');
const config = require('config');
var cookieParser = require('cookie-parser');
var path = require('path');
var logger = require('morgan');
var bodyParser  = require("body-parser"); //allows req.body.id etc

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
// view engine setup
app.use(express.static("views"));       // Allow access to content of views folder
app.use(express.static("scripts"));     // Allow access to scripts folder
app.use(express.static("images"));      // Allow access to images folder
app.use(express.static("models"));

const userSchema = require('./models/userSchema.js');
const User = mongoose.model('User', userSchema);

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

app.get('/users', function(req, res) {
	console.log('made it here to the /user function');
	User.find({}, function(err, user){
		if(err){
			console.log(err);
		}else{
			console.log(user);
			//res.statusCode = 200;
			//res.setHeader('content-Type', 'application/json');
			res.render('users', {data: user, title: 'Users'})
		}
	});
});

app.get('/user-add', function(req, res) {
  res.render('user-add.ejs', {title: 'Add User'});
  console.log("add-user page now rendered");    // the log function is used to output data to the terminal. 
});
//taking data from a form in the views - post request
app.post('/user-add', (req, res) => {
	let firstname = req.body.firstname;
	let lastname = req.body.lastname;
	let username = req.body.username;
	let passowrd = req.body.password;
	let newUser = {firstname: firstname, lastname: lastname, username: username, password: passowrd}
	User.create(newUser, (err, createdUser)=>{
		if(err){
			console.log(err);
		}else{
			res.redirect('/users');
		}
	});
});

app.get('/user/:id', function(req, res) {
	console.log('made it here to the /user-show function');
	User.findById({"_id":req.params.id}, function(err, user){
		if(err){
			console.log(err);
		}else{
			console.log(user);
			//res.statusCode = 200;
			//res.setHeader('content-Type', 'application/json');
			res.render('user-show', {user: user})
		}
	});
});

app.get('/user-delete/:id', function(req, res){
	console.log('user-delete function');
	console.log('User: '+ req.params.id);
	let id = req.params.id;
	if (id === null) {
        var err = new Error('User ' + id + ' does not exist!');
        err.status = 403;
        return next(err);
      
     }else{
		User.findByIdAndRemove({"_id":req.params.id}, function(err, user){
			if(err){
				console.log(err);
			}else{		
				console.log('User: '+ req.params.id+" deleted");
			}
		});
    res.redirect('/users');
    }	
});

app.get('*', function(req, res) {  res.render('error');});


// We need to set the requirements for the application to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!");
});
