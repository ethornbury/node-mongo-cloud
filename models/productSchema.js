const mongoose = require('mongoose');
//const Schema = mongoose.Schema;
require('mongoose-currency').loadType(mongoose); //load this into mongoose
const Currency = mongoose.Types.Currency;


const productSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		unique: true
	}, 
	description: {
		type: String
	},
	price: {
		type: Currency,
		required: [true, 'Price is required']
	}
});

module.exports = productSchema
