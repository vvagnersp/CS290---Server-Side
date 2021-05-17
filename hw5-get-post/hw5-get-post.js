var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 7431);

// GET requests
app.get('/requests',function(req,res){
  var urlParams = [];
  
  for (var p in req.query){
    urlParams.push({'name':p,'value':req.query[p]})
  }

  var context = {};
  context.urlData = urlParams;
  res.render('get-received', context);
});

// POST requests
app.post('/requests',function(req,res){
  var urlParams = [];
  var bodyParams = [];

  for (var u in req.query){
    urlParams.push({'name':u, 'value':req.query[u]})
  }

  for (var b in req.body){
    bodyParams.push({'name':b, 'value':req.body[b]})
  }

  var context = {};
  context.urlData = urlParams;
  context.bodyData = bodyParams;
  res.render('post-received', context)
});

// Error Handling
app.use(function(req,res){
  res.type('text/plain');
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
