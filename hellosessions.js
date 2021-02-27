// hello sessions
// start with code from lecture
var express = require('express');

var app = express();
var handlebars = require('express-handlebars').create({defaultLayout:'main'});
var bodyParser = require('body-parser');
var session = require('express-session');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(session({secret:'DefinitelySecret'}));

app.engine('handlebars', handlebars.engine);
app.set('view engine', 'handlebars');
app.set('port', 5356);

app.get('/count', function(req, res) {
  var context = {};
  context.count = req.session.count || 0;
  req.session.count = context.count + 1;
  res.render('counter', context);
});

app.post('/count', function(req, res) {
  var context = {};
  if (req.body.command === "resetCount") {
    req.session.count = 0;
  }
  else {
    context.err = true;
  }
  context.count = req.session.count || 0;
  req.session.count = context.count + 1;
  res.render('counter', context);
});



// my code below