const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const X = require('../models/xx');
const xxRouter = express.Router();
xxRouter.use(bodyParser.json());

xxRouter.route('/xx')
//
//all my routes here
//

var X = mongoose.model('X', xxSchema);
module.exports = X;