//实例化此类，可以传一个error或3个参数
class ResultModel extends Error{
    constructor(code, msg, data) {
        super();
        if (code instanceof Error) {
            this.stack=code.stack;
            msg = code.message;
            code = code.status || ResultModel.codes.error;
        }
        this.code = code;
        this.message = msg;
        this.data = data;
    }
}

ResultModel.codes = {
    error: 500,
    success: 200,
    noauth: 403,
    nologin:401,
    fail: 400,
    notfound: 404
}
ResultModel.success = function (msg, data) {
    return new ResultModel(ResultModel.codes.success, msg, data);
}
ResultModel.error = function (msg, data) {
    return new ResultModel(ResultModel.codes.error, msg, data);
}
ResultModel.fail = function (msg, data) {
    return new ResultModel(ResultModel.codes.fail, msg, data);
}
//向客户端输出结果
ResultModel.prototype.out = function (res) {
    res.status(this.code || 500);
    res.json(this);
}
module.exports = ResultModel;
