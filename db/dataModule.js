/*
* 数据访问父类
* 也可直接使用该类实例化 来访问数据库 ，如无特别业务无需建立子类
* */
var Q = require('q');
const config = require('../engine/configEngine.js');
const mongoose = require('mongoose');
//连接数据库
mongoose.connect(config.system.mongodb_conn);


var models = null;
function dataModule(model) {
    if(typeof model==='string'){
        if(!models[model]){
            throw new Error('model not defined');
        }
        this.model=models[model];
    }
    else{
        this.model=model;
    }
}
dataModule.prototype.add=function (data) {
    var defer = Q.defer()
    this.model.create(data,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.prototype.delete=function (condition) {
    var defer = Q.defer()
    this.model.deleteMany(condition,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.prototype.update=function (condition,data) {
    var defer = Q.defer()
    this.model.update(condition,data,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.prototype.find=function (condition,filed) {
    var defer = Q.defer();
    this.model.find(condition,filed,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
//保存数据（必须是通过find出来的数据实体）
dataModule.prototype.save=function (entity) {
    var defer = Q.defer()
    entity.save(function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.prototype.findOne=function (condition) {
    var defer = Q.defer()
    this.model.findOne(condition,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.prototype.count=function (condition) {
    var defer = Q.defer()
    this.model.count(condition,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.prototype.findById=function (id) {
    var defer = Q.defer()
    this.model.findById(id,function (err,rs) {
        if(err) defer.reject(err);
        else defer.resolve(rs);
    });
    return defer.promise;
}
dataModule.instance=function(modelName){
    return new dataModule(modelName);
}

//绑定实体对象
dataModule.init = function(mongooseModels){
    if(mongooseModels)
        models = mongooseModels;
}

//使用时需要传递models进来
module.exports=dataModule;
