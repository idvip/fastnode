/*
    用于加载过滤器
 */
const fileModuleUtil = require("../utils/fileModuleUtil");

let filter = fileModuleUtil.readModuleByDir('./filter', 'Filter',2);
if(filter.begin){
    console.log("过滤器：begin已加载。")
}
if(filter.end){
    console.log("过滤器：end已加载。")
}
module.exports = filter;

