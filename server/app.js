var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const headers = require('./middleware/headers');
const auth = require('./middleware/auth');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var favoriteRouter = require('./routes/favorites');
var cartsRouter = require('./routes/carts');
var productsRouter = require('./routes/products');
var app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(headers);
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/favorites', auth, favoriteRouter);
app.use('/products', auth, productsRouter);
app.use('/carts', auth, cartsRouter);

module.exports = app;
