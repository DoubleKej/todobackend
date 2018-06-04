var path = require("path");
var config = require('../config.json');

var mongoose = require('mongoose');
var Task = require('../model/todoModel')
var bodyParser = require('body-parser');

var urlencodedParser = bodyParser.urlencoded( {extended: false});

mongoose.connect(config.connectionString, (err) => {
    if (err) {
      console.log(err);
    } else {
      console.log('Connect Success')
    }
  })


module.exports = function(app){
    
    app.get('/todos', function(req, res){
        Task.find({}, function (err, task) {
            if (err)
            // res.render('index', {tableview: task});
            res.send(err);
        res.json({
            success: true,
            data: task
        });
    });

    });

    app.post('/add', function(req, res){
        console.log('helo ', req.body)
        var todo =new Task({
            name: req.body.name,
        });
        console.log(todo)
        console.log(todo);
        todo.save(function(err){ console.log('loi ' + err);
            res.json(
                todo
            );
        });

    });

    app.delete('/:taskId', function(req, res){
        console.log('del', req.params.taskId);
        Task.remove({
            _id: req.params.taskId
        }, function (err, task) {
            if (err)
                res.send(err);
            else {
                res.json({ message: 'Task successfully deleted' });
            }
        });
    });

    app.put('/edit/:taskId', urlencodedParser, function(req, res){
        console.log(req.params.taskId);
        console.log(req.body);
        Task.findOneAndUpdate(
            {
                _id: req.params.taskId
            },
            { 
                name: req.body.name,
                // status: req.body.status 
            },
            { new: true },
            function (err, task) {
                if (err)
                    res.json({
                        success: false,
                        error: err,
                    });
                else{
                    res.json({
                        success: true,
                        data: task,
                    });
                }
            });

    });
    app.put('/check/:taskId', urlencodedParser, function(req, res){
        console.log('checked ', req.params.taskId);
        console.log(req.body);
        Task.findOneAndUpdate(
            {
                _id: req.params.taskId
            },
            { 
                status: req.body.status 
            },
            { new: true },
            function (err, task) {
                if (err)
                    res.json({
                        success: false,
                        error: err,
                    });;
                res.json({
                    success: true,
                    data: task,
                });
            });

    });
};