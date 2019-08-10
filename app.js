const express  = require('express');
const mongoose = require('mongoose');
const config   = require('config');
var cookieParser = require('cookie-parser');
var path  		 = require('path');
var logger  	 = require('morgan');
var bodyParser   = require("body-parser"); //allows req.body.id etc

const app = express();
const router = express.Router();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

// view engine setup
app.use(express.static("views"));       // Allow access to content of views folder
app.use(express.static("scripts"));     // Allow access to scripts folder
app.use(express.static("images"));      // Allow access to images folder
app.use(express.static("models"));

const userSchema = require('./models/userSchema.js');
const User = mongoose.model('User', userSchema);

const productSchema = require('./models/productSchema');
const Product = mongoose.model('Product', productSchema);

//var productRouter = require('./routes/productRouter');
var indexRouter = require('./routes/index');
app.use('/', indexRouter);
//app.use('/product', productRouter);

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

// GET home page. now in routes folder
//app.get('/', function(req, res, next) {
//  res.render('index.ejs', { title: 'Express' });
//});

//----- USER ROUTES
app.get('/users', function(req, res) {
	console.log('made it here to the /user function');
	User.find({}, function(err, user){
		if(err){
			console.log(err);
			res.render('error', {title: 'Hell man, what happened?!'});
		}else{
			console.log(user);
			res.render('users', {data: user, title: 'Users list'})
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
			//res.redirect('/users');
			res.render('error', {title: 'Hell man, what happened?!'});
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
			res.render('error', {title: 'Hell man, what happened?!'});
		}else{
			console.log(user);
			res.render('user-show', {user: user, title: 'Show user'})
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
				res.render('error', {title: 'Hell man, what happened?!'});
			}else{		
				console.log('User: '+ req.params.id+" deleted");
			}
		});
    res.redirect('/users');
    }	
});

// ---------update user
app.get('/user-update/:id', function(req, res) {
	let id = req.params.id;
	console.log('made it here to the /user-update get function');
	User.findById({"_id":req.params.id}, function(err, user){
		if(err){
			console.log(err);
			res.render('error', {title: 'Hell man, what happened?!'});
		}else{
			console.log(user);
			res.render('user-update', {user: user, title: 'User update page'})
		}
	});

	console.log('user id', req.params.id);
});

app.post('/user-update', function(req, res){
	console.log('user-update post function');
	//let id = req.body.id;
	console.log('User: ', req.body.id);	//get the info from the ejs page?
	User.findByIdAndUpdate({"_id": req.body.id},
		{$set: {
			firstname: req.body.firstname, 
			lastname: req.body.lastname,
			username: req.body.username,
			password: req.body.password
			}
		}, function (err, result) {
			if (err) {
			  console.log(err);
			  res.render('error', {title: 'Hell man, what happened?!'});
			} else {
			 console.log("Post request for user updated successfully");
			 res.redirect('/users');
			}		
		})
		
});

// ---- PRODUCT ROUTES

app.get('/products', function(req, res) {
	console.log('made it here to the /products function');
	Product.find({}, function(err, product){
		if(err){
			console.log(err);
			res.render('error', {title: 'Hell man, what happened?!'});
		}else{
			console.log(product);
			res.render('products', {data: product, title: 'Products listing'})
		}
	});
});

app.get('/product-add', function(req, res) {
  res.render('product-add.ejs', {title: 'Add Product'});
  console.log("add-product page now rendered");    // the log function is used to output data to the terminal. 
});

//taking data from a form in the views - post request
app.post('/product-add', (req, res) => {
	let name = req.body.name;
	let description = req.body.description;
	let price = parseFloat(req.body.price).toFixed(2); //parse the price to 2 places of decimal tho there html5 validation on the page
	let newProduct = {name: name, description: description, price: price}
	Product.create(newProduct, (err, createdProduct)=>{
		if(err){
			console.log(err);
			res.render('error', {title: 'Hell man, what happened?!'});
			//res.redirect('/products');
		}else{
			res.redirect('/products');
		}
	});
});

app.get('/product/:id', function(req, res) {
	console.log('made it here to the /product-show function');
	Product.findById({"_id":req.params.id}, function(err, product){
		if(err){
			console.log(err);
			res.render('error', {title: 'Hell man, what happened?!'});
		}else{
			console.log(product);
			res.render('product-show', {product: product, title: 'Show Product'})
		}
	});
});

app.get('/product-delete/:id', function(req, res){
	console.log('product-delete function');
	console.log('Product: '+ req.params.id);
	let id = req.params.id;
	if (id === null) {
        var err = new Error('Product ' + id + ' does not exist!');
		console.log(err);
		res.render('error', {title: 'Hell man, what happened?!'});
      
     }else{
		Product.findByIdAndRemove({"_id":req.params.id}, function(err, product){
			if(err){
				console.log(err);
				res.render('error', {title: 'Hell man, what happened?!'});
			}else{		
				console.log('Product: '+ req.params.id+" deleted");
			}
		});
    res.redirect('/products');
    }	
});

// ---------update product
app.get('/product-update/:id', function(req, res) {
	let id = req.params.id;
	console.log('made it here to the /product-update get function');
	Product.findById({"_id":req.params.id}, function(err, product){
		if(err){
			console.log(err);
			res.render('error', {title: 'Hell man, what happened?!'});
		}else{
			console.log(product);
			res.render('product-update', {product: product, title: 'Product update page'})
		}
	});

	console.log('Product id', req.params.id);
});

app.post('/product-update', function(req, res){
	console.log('product-update post function');
	//let id = req.body.id;
	console.log('Product: ', req.body.id);	//get the info from the ejs page?
	Product.findByIdAndUpdate({"_id": req.body.id},
		{$set: {
			//"_id": req.body.id,
			name: req.body.name, 
			description: req.body.description,
			price: req.body.price			
			}
		}, function (err, result) {
			if (err) {
			  console.log(err);
			  res.render('error', {title: 'Hell man, what happened?!'});
			} else {
			 console.log("Product Updated successfully");
			 res.redirect('/products');
			}
	});
});

	
app.get('*', function(req, res) {  res.render('error', {title: 'Hell man, what happened?!'});});

// We need to set the requirements for the application to run
app.listen(process.env.PORT || 3000, process.env.IP || "0.0.0.0" , function(){
  console.log("App is Running ......... Yessssssssssssss!");
});
