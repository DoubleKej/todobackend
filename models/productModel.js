var mongoose = require('mongoose');
var Schema = mongoose.Schema;
// var Category = require('../models/categoryModel');

var model = new Schema({
    productName: {type: String},
    description: {type: String},
    color: {
        type: String,
        enum: ["red", "green", "blue"],
        required: true
    },
    category: { type: Schema.Types.ObjectId, ref: 'categorymodel' },
    price: {type: Number}
});

module.exports = mongoose.model('productmodel',model)