var express = require('express');
var mysql = require('./dbcon.js');
var app = express();
var path = require('path')

app.engine('html', require('ejs').renderFile);
app.use(express.static('assets'));
app.set('port', 7431);

app.get('/', function(req, res){
  res.sendFile(path.join(__dirname, '/index.html'));
});

// Get existing data from MySQL tatodo
app.get('/', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM workouts', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context)
  });
});

// Insert data from erLECT * FROMRtodo=WHERE id=?
app.post('/', function(req, res, next){
  var context = {};
  mysql.pool.query("INSERT INTO workouts (name, reps, weight, date, unit)", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
});

// Update data via the user
app.put('/', function(req, res, next){
  var context = {};
  mysql.pool.query("SELECT * FROM workouts WHERE id=?", [req.query.id], function(err, result){
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
app.delete('/' function(req, res, next){

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
