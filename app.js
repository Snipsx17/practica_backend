require('dotenv').config();

var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require('express-session');
const MongoStore = require('connect-mongo');
const LoginController = require('./controllers/LoginControllers');
const HomeController = require('./controllers/HomeController');
const AdvertsController = require('./controllers/AdvertsControllers');
const ProductController = require('./controllers/ProductController');
const AboutController = require('./controllers/AboutController');
const PrivateController = require('./controllers/PrivateController');
const authJwtMiddelware = require('./middelwares/authJwtMiddelware');
const sessionAuthMiddelware = require('./middelwares/sessionAuthMiddelware');
const upload = require('./lib/uploadConfig');

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

// inicializa la sesion en blanco
app.use(
  session({
    name: 'nodepop-cookie',
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 2, // 2d - inactivity
    },
    store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  })
);

app.use((req, res, next) => {
  res.locals.session = req.session;
  if (!res.locals.adverts) {
    res.locals.adverts = [];
  }
  next();
});

// instancias
const loginController = new LoginController();
const advertsControllers = new AdvertsController();
const homeController = new HomeController();
const productController = new ProductController();
const aboutController = new AboutController();
const privateController = new PrivateController();

// resourses
app.use('/public', express.static('public'));

// API routes
app.get('/apiv1/anuncios', authJwtMiddelware, advertsControllers.get);
app.get(
  '/apiv1/anuncios/id/:id',
  authJwtMiddelware,
  advertsControllers.getAdById
);
app.post(
  '/apiv1/anuncios',
  authJwtMiddelware,
  upload.single('imagen'),
  advertsControllers.createAd
);
app.post('/apiv1/authenticate', loginController.loginJWT);

// website
app.get('/', homeController.index);
app.get('/about', aboutController.index);
app.get('/login', loginController.index);
app.post('/login', loginController.login);
app.get('/logout', loginController.logout);
app.get('/private', sessionAuthMiddelware, privateController.index);
app.get(
  '/product/:productId',

  productController.productDetail
);

// catch 404
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  const isAPI = req.originalUrl.indexOf('/api') === 0;
  if (err.array) {
    err.status = 422;
    const errInfo = err.array({ onlyFirstError: true })[0];
    err.message = isAPI
      ? { message: 'not valid', errors: err.mapped() }
      : `not valid - ${errInfo.param} ${errInfo.msg}`;
  }

  err.status = err.status || 500;
  res.status(err.status);

  if (err.status && err.status >= 500) console.error(err);

  if (isAPI) {
    res.json({ error: err.message });
    return;
  }

  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};
  res.render('error');
});

module.exports = app;
