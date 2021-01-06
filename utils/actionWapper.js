const classHandler = require('./handler/classHandler.js');
const eventHandler = require('./handler/expressCycleEventHandler.js');
const result = require('../common/result.js');
/**
 * 封装express
 * 1:绑定action方法的this对象
 *  可通过this.app,this.req、this.res、this.body、this.params、this.query 获取相关对象
 * 2:绑定action方法的参数
 *  可通过参数列表直接取到params、body、query里的参数（按优先级排列）
 * 3:包装返回值，将action方法的返回值输出到客户端
 *  在action里不需要操作res.send，直接将值return即可，BaseController会接收并处理该值，返回任何数据或result对象（推荐），返回的普通数据将封装为result对象输出
 * */
function createProxy(fun) {
  const args = classHandler.args(fun);
  return async (req, res, next) => {
    // action里的this指针
    let that = {
      app: req.app,
      req,
      res,
      body: req.body,
      params: req.params,
      query: req.query,
    };
    try {
      // 请求开始处理事件
      eventHandler.call(that, 'request_begin');
      let rs = await fun.apply(
        that,
        classHandler.getArgumentsByObjects(
          [req.params, req.body, req.query],
          args
        )
      );
      if (!(rs instanceof result)) {
        rs = result.success(rs);
      }
      // 请求处理完毕，准备向客户端输出时事件，此rs返回的result对象
      await eventHandler.call(that, 'request_end', rs);
      // 已经发送过请求
      if (res.headersSent) return;
      rs.out(res);
    } catch (ex) {
      // 请求处理出现异常，即将向客户端输出错误事件
      await eventHandler.call(that, 'request_error', ex);
      next(ex);
    }
  };
}

module.exports = {
  createProxy
}
