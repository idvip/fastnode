const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const ResultModel = require('./common/ResultModel.js');


const app = express();
app.use(express.static(path.join(global.runpath, 'public')));
//开始加载模块
var moduleEngine = require('./engine/controllerEngine.js');
//开始加载过滤器
var filterEngine = require('./engine/filterEngine.js');




app.use(logger('short'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'default/public')));

//应用路由
app.use(moduleEngine.router);

//应用过滤器
if (filterEngine.begin)
    app.set('request_begin', filterEngine.begin);
if (filterEngine.end)
    app.set('request_end', filterEngine.end)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
    throw new ResultModel(ResultModel.codes.notfound, 'Not Found');
});

// error handler
app.use(function (err, req, res, next) {
    // console.error(err);
    if (!(err instanceof ResultModel)) {
        err = new ResultModel(err);
    }
    console.error(err);
   err.out(res);
});

module.exports = app;
