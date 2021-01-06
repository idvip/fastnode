const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const result = require('./common/result.js');

const indexRouter = require('./routes/index');
const nemRouter = require('./routes/nem');

const app = express();

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


app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use(moduleEngine.router);
app.use('/nem', nemRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
   console.error(err);
   new result(err).out(res);
});

module.exports = app;
