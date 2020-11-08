/*
* 加载所有model，并转换为mongoose的model
* */

const fs = require('fs');
const path = require("path");
const mongoose = require('mongoose');
const config = require('./configEngine.js');



let models = {};
let mongooseModels = {};

let parseFiles = function(path,files){
    //数据表前缀
    let prefix = config.system.prefix || "";
    prefix = prefix?prefix+"_":"";
    files.filter(a=>a.length>10 && a.lastIndexOf("Model.json")===a.length-10).forEach(function(file){
        let modelName = file.split("Model.json")[0];
        let fileCont = fs.readFileSync(path+"/"+file);
        try{
            let obj = JSON.parse(fileCont);
            models[modelName] = obj;
            mongooseModels[modelName] = getMongooseModel(obj,prefix+modelName);
            // console.log(obj);
        }
        catch (e) {
            console.error(e);
        }
    })
}

//普通model转mongooseModel
let getMongooseModel = function(model,modelName){
    for(let p in model){
        if(typeof  model[p] === 'string'){
            model[p] = eval(model[p]);
        }
        else{
            //todo:处理对象数据类型
        }
    }
    const mmodel =  new mongoose.Schema(model,{
        timestamps:true
    });
    //注册入mongoose并返回
    return mongoose.model(modelName, mmodel);

}



//加载系统model
let sysModelPath = path.resolve(__dirname,"../models");
let sysFiles = fs.readdirSync(sysModelPath);
parseFiles(sysModelPath,sysFiles);

//加载用户model
let userModelPath = path.resolve('./',"models");
let userFiles = fs.readdirSync(userModelPath);
parseFiles(userModelPath,userFiles);


module.exports={
    models,mongooseModels
}
