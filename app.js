var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');


var index = require('./routes/index');
// var users = require('./routes/users');

var app = express();

 //if in development mode, load .env variables
try{
  if (app.get("env") === "development") {
      env(__dirname + '/bin/development.env');
      console.log("got development mode");
  }
} catch(ex){
  console.error('could not read environment file. '+ ex.message);
}


// connect to database
//app.db = mongoose.connect(process.env.MONGOLAB_URI);
app.db = mongoose.connect("mongodb://admin:admin@ds231205.mlab.com:31205/idrbt");


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'html');
app.set('layout','layout');
app.engine('html', require('hogan-express'));
app.locals.delimiters = '<% %>'

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', index);
// app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
