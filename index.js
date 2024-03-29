const exportModel = {
    //启动项目并开启web服务，（path=项目主目录，如不传递则默认为当前工作目录，设置后代表工作目录+项目主目录）
    start: function (path) {
        exportModel.init(path);
        return require('./bin/www').start();
    },
    //初始化项目不开启web服务
    init: function (path) {
        global.runpath = './' + (path || '');
        initFramework();
    }
}

function initFramework() {
    const modelEngine = require('./engine/modelEngine.js');//加载实体
    const tools = require('./common/tools.js');
    const db = require('./db/dataModule.js');
    const ResultModel = require('./common/ResultModel.js');
    const config = require('./engine/configEngine.js');
    const tokenHelper = require('./module/tokenModule.js');
    db.init(modelEngine.models);
    /*导出对象*/
    //所有已加载并转换为mongoose实体的实体
    exportModel.models = modelEngine.models;
    //工具类
    exportModel.tools = tools;
    //数据访问类
    exportModel.db = db;
    exportModel.ResultModel = ResultModel;
    exportModel.config = config;
    exportModel.tokenHelper = tokenHelper;
}

module.exports = exportModel;
