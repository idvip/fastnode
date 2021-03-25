const dataModule = require("./dataModule.js");
const rst = require('../common/ResultModel.js');
var tools = require('../common/tools.js');

module.exports={
    //在指定的控制器生成model的基本操作方法
    bind:function (c,modelName) {
        let db = dataModule.instance(modelName);
        //通过ID查询 /modelname/find/:id
        c(modelName+"/find/:id","get",function (req,res,next) {
            let id = req.params.id;
            if(!tools.isObjectId(id)) return rst.fail("参数错误").out(res);
            return db.findById(id).then(function (obj) {
                rst.success("ok",obj).out(res);
            }).catch(function (err) {
                console.error(err);
                next(err);
            })
        });


        //查询数据（暂不支持分页），参数：{sort,pageIndex,pageSize,query:{}}
        c(modelName+"/list","post",function (req,res,next) {
            let data = req.body;
             return db.find(data.query||{}).then(function (obj) {
                rst.success("ok",obj).out(res);
            }).catch(function (err) {
                console.error(err);
                next(err);
            })
        });

        //查询数据（暂不支持分页），参数：{sort,pageIndex,pageSize,query:{}}
        c(modelName+"/count","post",function (req,res,next) {
            let data = req.body;
            return db.count(data.query||{}).then(function (obj) {
                rst.success("ok",obj).out(res);
            }).catch(function (err) {
                console.error(err);
                next(err);
            })
        });

        //删除数据
        c(modelName+"/delete/:id","post",function (req,res,next) {
            let id = req.params.id;
            if(!tools.isObjectId(id)) return rst.fail("参数错误").out(res);
            return db.delete({_id:id}).then(function (obj) {
                rst.success("ok",obj).out(res);
            }).catch(function (err) {
                console.error(err);
                next(err);
            })
        });

        //新增数据
        c(modelName+"/add","post",function (req,res,next) {
            let data = req.body;
            if(!data) return rst.fail("缺少参数").out(res);
            return db.add(data).then(function (obj) {
                rst.success("ok",obj).out(res);
            }).catch(function (err) {
                next(err);
            })
        });


        //修改数据
        c(modelName+"/update/:id","post",function (req,res,next) {
            let data = req.body;
            if(!data) return rst.fail("缺少参数").out(res);
            return db.update({_id:id},data).then(function (obj) {
                rst.success("ok",obj).out(res);
            }).catch(function (err) {
                next(err);
            })
        });

    }
}
