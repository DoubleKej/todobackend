var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var model = new Schema({
    name: {type: String},
    status: {type: Boolean, default: false, required:true}
});

module.exports = mongoose.model('todomodel', model);