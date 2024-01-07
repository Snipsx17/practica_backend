require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const LoginController = require('./controllers/LoginControllers');
const AdvertsController = require('./controllers/AdvertsControllers');
const authJwtMiddelware = require('./middelwares/authJwtMiddelware');

var app = express();

require('./lib/connectMongose');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// instancias
const loginController = new LoginController();
const advertsControllers = new AdvertsController();

app.use('/', require('./routes/index'));
app.use('/users', require('./routes/users'));
// API routes
app.get('/apiv1/anuncios', authJwtMiddelware, advertsControllers.get);
app.post('/apiv1/authenticate', loginController.loginJWT);
app.use('/public', express.static('public'));

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  if (err.array) {
    const errorInfo = err.errors[0];
    err.message = `Error en ${errorInfo.location} en el parametro ${errorInfo.path} ${errorInfo.msg}`;
  }

  if (req.originalUrl.startsWith('/apiv1/')) {
    res.json({ error: err.message });
    return;
  }
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
