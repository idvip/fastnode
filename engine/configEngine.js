//用于加载配置文件
const fs = require("fs");
var path = require("path");

let dirName = "./config";
let moduleJsonPath = path.resolve(dirName+"/module.json");
let systemJsonPath =  path.resolve(dirName+"/system.json");
let moduleConfig = null;
let systemConfig = null;

console.log("p:"+moduleJsonPath);
console.log("p:"+systemJsonPath);

//加载模块配置文件
if(fs.existsSync(moduleJsonPath)){
    try{
        moduleConfig = JSON.parse(fs.readFileSync(moduleJsonPath,"utf-8"));
    }
    catch (e) {
        console.error(e);
    }
}//加载系统配置文件
if(fs.existsSync(systemJsonPath)){
    try{
        systemConfig = JSON.parse(fs.readFileSync(systemJsonPath,"utf-8"));
    }
    catch (e) {
        console.error(e);
    }
}
module.exports={
    module:moduleConfig,
    system:systemConfig
}