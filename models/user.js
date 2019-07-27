const mongoose = require('mongoose');
//const Schema = mongoose.Schema;

const userSchema = new mongoose.Schema({
	username: {
		type: String,
		required: true,
		unique: [true, 'Username is required']
	}, 
	password: {
		type: String,
		required: true
	},
	admin: {
		type: Boolean,
		default: false
	},
	firstname: {
		type: String
	},
	lastname: {
		type: String
	}
});

//var Users = mongoose.model('User', userSchema);
//module.exports = mongoose.model('User', userSchema);
module.exports = userSchema
