/*
    用于从配置文件加载模块
 */
const path = require("path");
const config = require("./configEngine.js");
const controller = require("./controllerEngine.js");
const sysModules = require("../modules");
console.log("加载系统模块，数量："+sysModules.length)

//加载系统模块
sysModules.forEach(function(item){
    let c = controller.getLoader(item);
    item.controllers.forEach(a=>a(c));
    c.register();
})
//加载用户模块
if(config.module){
    console.log("开始加载模块……模块数量："+config.module.length);
    config.module.forEach(function (item,i) {
        if(item.code && item.path) {
            console.log("load module", item.name, item.path);
            let c = controller.getLoader(item);
            if(item.controllers && item.controllers.length>0){
                item.controllers.forEach(function (ctrl) {
                    require(path.resolve('./'+item.path+"/controller/"+ctrl))(c);
                    //正式加载
                    c.register();
                })
            }
        }
        else{
            console.log("module配置不正确",i+1);
        }
    })
    if(config.module.path){
        console.log("module:"+config.module)
    }
}
else{
    console.log("module配置不存在");
}

exports.router = controller.getRouter();