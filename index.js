const modelEngine = require('./engine/modelEngine.js');//加载实体
const tools = require('./common/tools.js');
const db = require('./db/dataModule.js');
const ResultModel = require('./common/ResultModel.js');
db.init(modelEngine.mongooseModels);
module.exports={
    //启动项目
    start:function () {
        require('./bin/www').start();
    },
    //所有已加载并转换为mongoose实体的实体
    models:modelEngine.models,
    //工具类
    tools,
    //数据访问类
    db,
    ResultModel
}
