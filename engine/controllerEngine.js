/*
    用于从配置文件加载模块
 */
const config = require("./configEngine.js");
const controller = require("./actionEngine.js");
const fileModuleUtil = require("../utils/fileModuleUtil");

//加载系统模块
let sysControllerObj = fileModuleUtil.readModuleByDir("../default/controllers",'Controller')
//加载用户模块
let userControllerObj = fileModuleUtil.readModuleByDir("./controllers",'Controller',2)

Object.values(sysControllerObj).concat(Object.values(userControllerObj)).forEach(function(fun){
    let c = controller.getLoader();
    fun.call(c);
    //正式加载
    c.register();
})


exports.router = controller.getRouter();
