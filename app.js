const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const session = require('express-session');
const ResultModel = require('./common/ResultModel.js');


const app = express();
app.use(express.static(path.join('./', 'public')));
//开始加载模块
var moduleEngine = require('./engine/controllerEngine.js');


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

app.use(moduleEngine.router);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
   throw new ResultModel(ResultModel.codes.notfound,'Not Found');
});

// error handler
app.use(function(err, req, res, next) {
   // console.error(err);
   if(!(err instanceof ResultModel)){
       err = new ResultModel(err);
   }
   console.error(err);
   err.out(res);
});

module.exports = app;
