var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Product = require('../models/productModel');

var model = new Schema({
    // _id: Schema.Types.ObjectId,
    categoryName: {type: String},
    description: {type: String},
    // products: [{ type: Schema.Types.ObjectId, ref: 'Product' }]
});

module.exports = mongoose.model('categorymodel',model)

