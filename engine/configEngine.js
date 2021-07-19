/*
    用于加载配置文件
 */

const fs = require("fs");
const path = require("path");
let envName = process.env.NODE_ENV;
let dirName = global.runpath + "/config";
let defaultConfigPath = path.resolve(dirName + "/default.js");
let envConfigPath = envName ? path.resolve(dirName + "/" + envName + '.js') : null;
let defaultConfig = null;
let envConfig = null;

console.log(`NODE_ENV:${envName}`)
//加载默认配置文件
if (fs.existsSync(defaultConfigPath)) {
    try {
        defaultConfig = require(defaultConfigPath);
        console.log(`默认配置加载完成:${defaultConfigPath}`)
    } catch (e) {
        console.error(e);
    }
}//加载环境配置文件
if (fs.existsSync(envConfigPath)) {
    try {
        envConfig = require(envConfigPath);
        console.log(`环境配置加载完成:${envConfigPath}`)
    } catch (e) {
        console.error(e);
    }
}
module.exports = {
    ...defaultConfig,
    ...envConfig
}
