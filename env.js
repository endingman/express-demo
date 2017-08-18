var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/expressDemo');
exports.mongoose = mongoose;