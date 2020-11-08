var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var session = require('express-session');

var indexRouter = require('./routes/index');
var nemRouter = require('./routes/nem');

var app = express();

//加载实体类

//开始加载模块
var moduleEngine = require('./engine/moduleEngine.js');

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

//session
app.use(session({
    secret: 'fdsarewfda3890423jio#@*(032h432789h',
    name: 'N-USER-SESSION-ID',   //这里的name值得是cookie的name，默认cookie的name是：connect.sid
    cookie: {maxAge: 30*60*1000 },  //10分钟过期（单位是毫秒）
    resave: false,
    saveUninitialized: true,
}));


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/',moduleEngine.router);
app.use('/men', nemRouter);

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

module.exports = app;
