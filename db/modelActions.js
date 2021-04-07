const dataModule = require("./dataModule.js");
const rst = require('../common/ResultModel.js');
var tools = require('../common/tools.js');

module.exports = {
    //在指定的控制器生成model的基本操作方法
    bind: function (c, modelName) {
        let db = dataModule.instance(modelName);
        //通过ID查询 /modelname/find/:id
        c(modelName + "/find/:id", "get", function (id) {
            if (!tools.isObjectId(id)) return rst.fail("参数错误");
            return db.findById(id);
        });


        //查询数据（暂不支持分页），参数：{fields:{a:1,b:1,c:1}/"a b c",sort,pageIndex,pageSize,query:{}}
        c(modelName + "/list", "post", function () {
            let data = this.body;
            return db.find(data.query || {}, data.fields, data.sort, data.pageIndex, data.pageSize);
        });

        //查询数据（暂不支持分页），参数：{sort,pageIndex,pageSize,query:{}}
        c(modelName + "/count", "post", function () {
            let data = this.body;
            return db.count(data.query || {});
        });

        //删除数据
        c(modelName + "/delete/:id", "post", function (id) {
            if (!tools.isObjectId(id)) return rst.fail("参数错误").out(res);
            return db.delete({_id: id});
        });

        //新增数据
        c(modelName + "/add", "post", function () {
            let data = this.body;
            if (!data) return rst.fail("缺少参数");
            return db.add(data);
        });


        //修改数据
        c(modelName + "/update/:id", "post", function (id) {
            let data = this.body;
            if (!data) return rst.fail("缺少参数");
            return db.update({_id: id}, data);
        });

    }
}
