var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var bodyParser = require('body-parser');

var handlebars = require('express-handlebars').create({defaultLayout:'main'});

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7431);
app.use(express.static('assets'));
app.use(bodyParser.urlencoded({ extended: false}));

// Load page with existing data from SQL table
app.get('/', function(req, res){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts", function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = rows;
    res.render('home', context);
  });
});

// Insert data from user form
app.post('/', function(req, res, next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, unit) VALUES (?, ?, ?, ?, ?)", 
    [req.body.name, req.body.reps, req.body.weight, req.body.date, req.body.unit], function(err, result){
    if(err){
      next(err);
      return;
    }
  });
});

// Update SQL table via user input
app.put('/', function(req, res, next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE name=?", [req.body.name], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
    var curVals = result[0];
    mysql.pool.query("UPDATE workouts SET name=?, reps=?, weight=?, date=?, unit=?, WHERE id=?",
      [req.query.name || curVals.name, req.query.reps || curVals.reps, req.query.weight ||
      curVals.weight, req.query.date || curVals.date, req.query.unit || curVals.unit, req.query.id],
      function(err, result){
        if(err){
          next(err);
          return;
        }
      });
    }
  });
});

// Delete row from MySQL table
app.delete('/', function(req, res, next){

});

// Error Handling
app.use(function(req,res){
  res.type('plain/text');
  res.status(404);
  res.send('404 - Not Found');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('plain/text');
  res.status(500);
  res.send('500 - Server Error');
});

// Port listen
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

