var express = require('express');

var app = express();
var hbs = require('express-handlebars').create({defaultLayout:'main', extname: 'hbs'});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', 7431);
app.use(express.static('public'));


// Render main four pages: home, store, purchase, and about
app.get('/', function(req, res) {
  res.render('index', {title: 'Home', condition: false});
})

app.get('/store', function(req, res) {
  res.render('store', {title: 'Store', condition: false});
})

app.get('/purchase', function(req, res) {
  res.render('purchase', {title: 'Purchase', condition: false});
})

app.get('/about', function(req, res) {
  res.render('about', {title: 'About', condition: false});
})


// Render error pages
app.use(function(req,res){
  res.status(404);
  res.render('404');
});

app.use(function(err, req, res, next){
  console.error(err.stack);
  res.type('text/plain');
  res.status(500);
  res.render('500');
});

// Server start message
app.listen(app.get('port'), function(){
  console.log('Express started on http://localhost:' + app.get('port') + '; press Ctrl-C to terminate.');
});

