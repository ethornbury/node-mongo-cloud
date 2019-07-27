const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const express = require('express');
const app = express();
//const router = express.Router();

//const User = mongoose.model('user', userSchema, 'user');
const Users = require('../models/user');
userRouter = express.Router();
app.use('/user', userRouter);
userRouter.use(bodyParser.json());

userRouter.route('/user');

//
//all my routes here
//

app.get('/user', function(req, res, next) {
	console.log('made it here to the routes user.js');
  res.render('users.ejs');
});

app.get('/add', function(req, res) {
  res.render('add-user.ejs');
  console.log("add-user page now rendered");    // the log function is used to output data to the terminal. 
});
//taking data from a form in the views - post request
app.post('/add', function(req, res) {
  //let sql = 'INSERT INTO products_ejs ( Name, Price, Descript, Image) VALUES ("'+req.body.name+'", '+req.body.price+', "'+req.body.descript+'",  "'+req.body.image+'")';
  //let query = db.query(sql, (err, res) => {
  //  if(err) throw err;
    console.log('add user');
  res.redirect('/user',202 ,  {message: 'new user created'}); // redirect to product funtion so it will render the view with the row data 
  console.log("Now you are on the users page!");
});

//-----
// app.get('/products', function(req, res){
    // db.query('SELECT * FROM products_ejs; SELECT * FROM users; select count(id) from users;', [1, 2, 3], function(err, results){
        // if (err) throw err;
        // // `results` is an array with one element for every statement in the query:
        // console.log(results[0]); // [{1: 1}]
        // console.log(results[1]); // [{2: 2}]
        // var res1 = results[0];
        // var res2 = results[1];
		// //var res3 = results[2];
		
		// var res3 = JSON.stringify(results[2]); //to display data, need to JSON.stringify
		// console.log('res3 ', res3);
        // res.render('products.ejs', {res1, res2, res3, reviews, title: 'Products listing', message: ' '});
        // wstream.write('\nall product listing and JSON reviews display' + new Date(Date.now()).toLocaleString());
    // });
    // console.log("Now you are on the products page! ");
// });  

//----



// .get((req, res, next)=> {
	// Users.find({})
	// .then((users) =>{
		// res.statusCode = 200;
		// res.setHeader('content-Type', 'application/json');
		// res.json(users);
		// console.log('users\n', users);
		// console.log('res\n', res);
		// res.render('users', {users: users, title: 'Users'});
		// //put the dishes into the body of the reply message and send to server
	// }, (err) => next(err))
	// .catch((err) => next(err));
// })
// .post((req, res, next)=> {
	// Users.create(req.body)
	// .then((user)=> {
		// console.log('User created', user);
		// res.statusCode = 200;
		// res.setHeader('content-Type', 'application/json');
		// res.json(user);
	// }, (err) => next(err))
	// .catch((err) => next(err));
// })
// .put((req, res, next)=> {
	// res.statusCode = 403;
	// res.end('PUT operation not supported on users');	
// })
// .delete((req, res, next)=> {
	// Users.remove({})
	// .then((resp) => {
		// res.statusCode = 200;
		// res.setHeader('content-Type', 'application/json');
		// res.json(resp);
	// }, (err) => next(err))
	// .catch((err) => next(err));	
// });

// //----- with params /:dishId
// userRouter.route('/:userId')
// .get((req, res, next)=> {
	// Users.findById(req.params.userId)
	// .then((user)=> {
		// console.log('User found: ', user);
		// res.statusCode = 200;
		// res.setHeader('content-Type', 'application/json');
		// res.json(user);
	// }, (err) => next(err))
	// .catch((err) => next(err));
// })
// .post((req, res, next)=> {
	// res.statusCode = 403;
	// res.end('POST operation not supported on users: ' +req.params.userId);
// })
// .put((req, res, next)=> {
	// Userss.findByIdAndUpdate(req.params.userId, {
		// $set: req.body
	// }, {new: true})
	// .then((user)=> {
		// console.log('User found: ', user);
		// res.statusCode = 200;
		// res.setHeader('content-Type', 'application/json');
		// res.json(user);
	// }, (err) => next(err))
	// .catch((err) => next(err));
// })
// .delete((req, res, next)=> {
	// Users.findByIdAndRemove(req.params.userId)
	// .then((user)=> {
		// //console.log('User found: ', user);
		// res.statusCode = 200;
		// res.setHeader('content-Type', 'application/json');
		// res.json(user);
	// }, (err) => next(err))
	// .catch((err) => next(err));
// });



module.exports = Users;