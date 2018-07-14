var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var Category = require('../models/categoryModel');

mongoose.connect('mongodb://localhost/dbshop', (err) => {
    if (err) {
        console.log(err);
    } else {
        console.log("Database connected!");
    }
})

module.exports = function (app) {

    app.get('/get/categories', function (req, res) {
        Category.find({}, function (err, category) {
            if (err)
                res.send(err);
            res.json({
                success: true,
                data: category
            });
        });
    });

    app.post('/post/categories', function (req, res) {
        console.log('req.body:', req.body)
        var newCategory = new Category({
            // cateId: req.body.cateId,
            categoryName: req.body.categoryName,
            description: req.body.description
        });
        console.log(newCategory)
        newCategory.save(function (err) {
            console.log('Error: ' + err);
            res.json(
                newCategory
            );
        });

    });

    app.delete('/delete/categories/:Id', function (req, res) {
        console.log('del', req.params.Id);
        Category.remove({
            _id: req.params.Id
        }, function (err, category) {
            if (err)
                res.send(err);
            else {
                res.json({ message: 'Category has been deleted!!!' });
            }
        })
    })

    app.put('/put/categories/:Id',  function (req, res) {
        const newName = req.body.categoryName;
        const newDescription = req.body.description;
        console.log("new data:", req.body);
        Category.findOne(
            {
                _id: req.params.Id
            },
            function (err, category) {
                if (err)
                    res.json({
                        success: false,
                        error: err,
                    });
                else {
                    if (newName) category.categoryName = newName;
                    if (newDescription) category.description = newDescription;
                    category.save(function (err) {
                        res.json({
                            success: true,
                            data: category,
                        });
                    })

                }
            });


    });

};

