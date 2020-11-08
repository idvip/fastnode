//实例化此类，可以传一个error或3个参数
var result = function (code, msg, data) {
    if (code instanceof Error) {
        console.error(code);
        msg = code.message;
        code = code.status || result.codes.error;
    }
    this.code = code;
    this.message = msg;
    this.data = data;
}
result.codes = {
    error: 500,
    success: 200,
    noauth: 403,
    fail: 400,
    notfound: 404
}
result.success = function (msg, data) {
    return new result(result.codes.success, msg, data);
}
result.error = function (msg, data) {
    return new result(result.codes.error, msg, data);
}
result.fail = function (msg, data) {
    return new result(result.codes.fail, msg, data);
}
//向客户端输出结果
result.prototype.out = function (res) {
    res.status(this.code || 500);
    res.json(this);
}
module.exports = result;
