const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const Users = require('../models/users');
const userRouter = express.Router();
userRouter.use(bodyParser.json());

userRouter.route('/')
//
//all my routes here
//

var Users = mongoose.model('User', dishSchema);
module.exports = Userss;