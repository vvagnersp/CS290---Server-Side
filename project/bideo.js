var express = require('express');

var app = express();
var hbs = require('express-handlebars').create({defaultLayout:'main', extname: 'hbs',});
var bodyParser = require('body-parser');


app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('port', 7431);
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false}));

// Render main four pages: home, store, purchase, and about
app.get('/', function(req, res) {
  res.render('index', {title: 'Home', condition: false});
});

app.get('/store', function(req, res) {
  var storeItems = [    
  {
    "ID": "001",
    "name": "Big VHS",
    "image": "/images/store/giant-4690691_1920.jpg",
    "rating": "7/10",
    "description": "Big VHS in the woods, no delivery",
    "price": "65 USD",
    "source": "https://pixabay.com/photos/giant-large-huge-vhs-composing-4690691/"
  },

  {
    "ID": "002",
    "name": "Some Equipment",
    "image": "/images/store/record-4871720_1920.jpg",
    "rating": "4/10",
    "description": "A VCR or something and an audio controller (?)",
    "price": "853,471 yen",
    "source": "https://pixabay.com/photos/record-player-vintage-technology-4871720/"
  },

  {
    "ID": "003",
    "name": "Broken Cassette",
    "image": "images/store/cassette-994272_1920.jpg",
    "rating": "1/10",
    "description": "Cassette, broken",
    "price": "1 peso",
    "source": "https://pixabay.com/photos/cassette-obsolete-chaos-audio-994272/"
  },

  {
    "ID": "004",
    "name": "CD With Hole Drilled in it and a Lock",
    "image": "images/store/privacy-policy-445153_1920.jpg",
    "rating": "10/10",
    "description": "This CD has a hole in it",
    "price": "400 Euros",
    "source": "https://pixabay.com/photos/privacy-policy-data-security-445153/"
  },

  {
    "ID": "005",
    "name": "RARE: COMPUTER",
    "image": "images/store/computer-1895383_1920.jpg",
    "rating": "3.3241/10",
    "description": "O l d comp ut er",
    "price": "13,423 Rubles",
    "source": "https://pixabay.com/photos/computer-retro-old-privacy-policy-1895383/"
  },

  {
    "ID": "006",
    "name": "Four Floppy Discs",
    "image": "images/store/black-18320_1920.jpg",
    "rating": "14/10",
    "description": "Floppy discs. What secrets do they hold? Good luck reading them.",
    "price": "4,000,000 AUD",
    "source": "https://pixabay.com/photos/black-business-computer-computing-18320/"
  }
]; 
  res.render('store', {title: 'Store', items: storeItems, condition: false});
});

app.get('/purchase', function(req, res) {
  res.render('purchase', {title: 'Purchase', condition: false});
});

app.get('/about', function(req, res) {
  res.render('about', {title: 'About', condition: false});
});

// Form submission
app.post('/about', function(req, res) {
  res.render('form-received', req.body);
});

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

