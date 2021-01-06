/*

用于初始化控制器

 */


const express = require('express');

const tools = require('../common/tools.js');

const modelActions = require('../db/modelActions.js');

const actionWapper = require('../utils/actionWapper.js');
const router = express.Router();

//缓存路径对应的规则，用于权限校验
const uriRule = {};

//获取一个新的loader
function getLoader(module) {
    //loader用于解析控制器，并且加载进express的路由
    let defRule = {
        method: 'get'
    };
    let actions = [];
    //用于创建一个新的控制器,rule=规则,action=处理方法
    //支持重载：url,action 、url,method,action、rule,action
    let c = function (rule, action, act) {
        if (typeof rule == "string") {
            if (typeof action == "string") {
                rule = {path: rule, method: action};
                action = act;
            } else {
                rule = {path: rule};
            }
        }
        rule = tools.mergeObj(defRule, rule);
        if (rule.path.indexOf("/") !== 0) rule.path = "/" + rule.path;
        actions.push([module, rule, action]);
    }
    //设置通用规则（一般用于一个控制器中所有ACTION统一权限）
    c.rule = function (rule) {
        if (rule && typeof rule == 'object')
            defRule = tools.mergeObj(defRule, rule);
    }
    c.bind = function (modelName) {
        modelActions.bind(c, modelName);
    }
    //将所有控制器注册到路由（不直接在调用时注册是因为 rule方法可以后调用，最后注册为了实现rule方法任意位置调用）
    c.register = function () {
        actions.forEach(a => addToRouter(a[0], a[1], a[2]));
    }
    return c;
}

//权限校验中间件
function authMiddleware(req, res, next) {
    //todo:暂未做校验处理
    console.log(req.method, res.path);
    next();
}

//将一个控制器ACTION加入路由
function addToRouter(module, rule, action) {
    //请求方式大写转小写
    rule.method = rule.method.toLowerCase();
    if (router[rule.method]) {
        let uri = "/" + module.code + rule.path;
        console.log("uri:", rule.method, uri);
        uriRule[rule.method + uri] = rule;
        router[rule.method](uri, authMiddleware, actionWapper.createProxy(action));
    } else {
        console.log("dd")
    }
}

module.exports = {
    getLoader,
    getRouter: function () {
        return router;
    }

}
