/*
* 加载所有model，并转换为mongoose的model
* */
const mongoose = require('mongoose');
const config = require('./configEngine.js');
const fileModuleUtil = require('../utils/fileModuleUtil.js');

let mongooseModels = {};

let parseModel = function(modelObj){
    //数据表前缀
    let prefix = config.prefix || "";
    prefix = prefix?prefix+"_":"";
    for (let p in modelObj) {
        mongooseModels[p] = getMongooseModel(modelObj[p], prefix + p);
    }
}

//普通model转mongooseModel
let getMongooseModel = function(model,modelName){
    const mmodel =  new mongoose.Schema(model,{
        timestamps:true
    });
    //注册入mongoose并返回
    return mongoose.model(modelName, mmodel);
}



//加载系统model
let sysModelObj = fileModuleUtil.readModuleByDir("../default/models",'Model')
parseModel(sysModelObj);

//加载用户model
let userModelObj = fileModuleUtil.readModuleByDir("./models",'Model',2)
parseModel(userModelObj);


module.exports={
    models:mongooseModels
}
