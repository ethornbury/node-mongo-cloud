/*
product routes here
*/
const express = require('express');
const app = express.Router();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Product = require('../models/productSchema');
const productRouter = express.Router();
productRouter.use(bodyParser.json());

productRouter.route('/')

app.get('/products', function(req, res) {
	console.log('made it here to the /products function');
	Product.find({}, function(err, product){
		if(err){
			console.log(err);
		}else{
			console.log(user);
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
	let price = req.body.price;

	let newProduct = {name: name, description: description, price: price}
	Product.create(newProduct, (err, createdProduct)=>{
		if(err){
			console.log(err);
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
        err.status = 403;
        return next(err);
      
     }else{
		Product.findByIdAndRemove({"_id":req.params.id}, function(err, product){
			if(err){
				console.log(err);
			}else{		
				console.log('Product: '+ req.params.id+" deleted");
			}
		});
    res.redirect('/products');
    }	
});

// ---------update user
app.get('/product-update/:id', function(req, res) {
	let id = req.params.id;
	console.log('made it here to the /product-update get function');
	Product.findById({"_id":req.params.id}, function(err, product){
		if(err){
			console.log(err);
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
			name: req.body.name, 
			description: req.body.description,
			price: req.body.price,
			
			}
		}, function (err, result) {
			if (err) {
			  console.log(err);
			} else {
			 console.log("Product Updated successfully");
			 res.redirect('/products');
			}		
		})
		
});

module.exports = app;