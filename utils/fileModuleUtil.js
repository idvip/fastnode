//从文件读取module帮助类
const path = require('path');
const fs = require('fs');
const SYSTEMPATH = __dirname;
const RUNPATH = './';


//扫描一个文件夹下符合指定后缀的module
//type:1=系统目录（框架目录，默认） 2=运行目录（项目目录）
function readModuleByDir(dir, suffix, type) {
    type = type || 1;
    let moduleObj = {};
    //加载系统model
    let modulePath = path.resolve(type === 1 ? SYSTEMPATH : RUNPATH, dir);
    if (fs.existsSync(modulePath)) {
        let files = fs.readdirSync(modulePath);
        suffix = `${suffix}.js`;
        files.filter(a => a.lastIndexOf(suffix) === (a.length - suffix.length)).forEach(function (file) {
            let key = file.split(suffix)[0];
            moduleObj[key] = require(`${dir}/${file}`);
        })
    }
    else{
        console.log(`无法加载模块，以下目录不存在：${modulePath}`)
    }
    return moduleObj;
}

module.exports = {
    readModuleByDir
}
