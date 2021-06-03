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

connection.connect((err) => {
  if (err) throw err;
  console.log('Connected!');
});

// Get data
app.get('/', function(req, res, next){
  var context = {};
  mysql.pool.query('SELECT * FROM todo', function(err, rows, fields){
    if(err){
      next(err);
      return;
    }
    context.results = JSON.stringify(rows);
    res.send(context)
  });
});

// Insert data from user
app.get('/', function(req, res, next){
  var context = {};
  mysql.pool.query("SELECT * FROM todo WHERE id=?", [req.query.id], function(err, result){
    if(err){
      next(err);
      return;
    }
    if(result.length == 1){
    var curVals = result[0];
    mysql.pool.query("UPDATE todo SET name=?, done=?, due=?, WHERE id=?",
      [req.query.name || curVals.name, req.query.done || curVals.done. req.query.due ||
       curVals.due, req.query.id],
      function(err, result){
        if(err){
          next(err);
          return;
        }
      });
    }
  });
});

// Update something from table via user info
app.get('/', function(req, res, next){

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
