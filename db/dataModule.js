/*
* 数据访问父类
* 也可直接使用该类实例化 来访问数据库 ，如无特别业务无需建立子类
* */
const config = require('../engine/configEngine.js');
const mongoose = require('mongoose');
//连接数据库
mongoose.connect(config.system.mongodb_conn,{ useNewUrlParser: true,useUnifiedTopology:true });


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
    return this.model.create(data)
}
dataModule.prototype.delete=function (condition) {
    return this.model.deleteMany(condition);
}
dataModule.prototype.update=function (condition,data) {
    return this.model.update(condition,data);
}
dataModule.prototype.find=function (condition,filed) {
    return this.model.find(condition,filed);
}
//保存数据（必须是通过find出来的数据实体）
dataModule.prototype.save=function (entity) {
    return entity.save();
}
dataModule.prototype.findOne=function (condition) {
    return this.model.findOne(condition)
}
dataModule.prototype.count=function (condition) {
    return this.model.count(condition);
}
dataModule.prototype.findById=function (id) {
    return this.model.findById(id)
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
