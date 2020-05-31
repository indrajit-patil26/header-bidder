var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var cron = require('node-cron');
var Advertisement = require('./models/advertisement');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var advertisementRouter = require('./routes/advertisement');
var trackingRouter = require('./routes/tracking');
var loadRouter = require('./routes/load');
var compression = require('compression');
var helmet = require('helmet');

var app = express();

//Set up mongoose connection
var mongoose = require('mongoose');
var mongoDB = 'mongodb+srv://dbUser:dbUserPassword@cluster0-7xvue.azure.mongodb.net/header_bidder?retryWrites=true&w=majority';
mongoose.connect(mongoDB, { useNewUrlParser: true });
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(compression());
app.use(helmet());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/api', advertisementRouter);
app.use('/api', trackingRouter);
app.use('/api', loadRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
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

// Cron Job to mark advertisements as inactive after their validity expires. Runs every night at 12:02am
// when the load on server is expected to be low.

cron.schedule('2 0 * * *', () => {
  Advertisement.updateMany({ "validity": { $lte: new Date() } }, {"$set":{"active": false}});
});

module.exports = app;
