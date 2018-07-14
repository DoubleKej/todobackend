var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Product = require('../models/productModel');

mongoose.connect('mongodb://localhost/dbshop', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected!");
    }
})

module.exports = function (app) {

    app.get('/get/products', function (req, res) {
        Product.find({}, function (err, product) {
            if (err)
                res.send(err);
            res.json({
                success: true,
                data: product
            });c
        });
    });

    app.post('/post/products', function (req, res) {
        console.log('req.body:', req.body)
        var newProduct = new Product({
            // cateId: req.body.cateId,
            productName: req.body.productName,
            description: req.body.description,
            color: req.body.color,
            price: req.body.price

        });
        console.log(newProduct)
        newProduct.save(function (err) {
            console.log('Error: ' + err);
            res.json(
                newProduct
            );
        });

    });

    app.delete('/delete/products/:Id', function (req, res) {
        console.log('del', req.params.Id);
        Product.remove({
            _id: req.params.Id
        }, function (err, product) {
            if (err)
                res.send(err);
            else {
                res.json({ message: 'Product has been deleted!!!' });
            }
        })
    })

    app.put('/put/products/:Id', urlencodedParser, function (req, res) {
        const newName = req.body.productName;
        const newDescription = req.body.description;
        const newColor = req.body.color,
        const newPrice = req.body.price
        Product.findOne(
            {
                _id: req.params.Id
            },
            function (err, product) {
                if (err)
                    res.json({
                        success: false,
                        error: err,
                    });
                else {
                    if (newName) product.productName = newName;
                    if (newDescription) product.description = newDescription;
                    if (newColor) product.color = newColor;
                    if (newPrice) product.price = newPrice;
                    product.save(function (err) {
                        res.json({
                            success: true,
                            data: product,
                        });
                    })

                }
            });


    });

};

