/**
 *express自定义生命周期事件触发器
 * 使用方法：
 * app.set('eventName',function(data){});
 * 此方法支持promise同步处理
 */
module.exports = function (eventName, data) {
  if (
    this.app &&
    this.app.get(eventName) &&
    typeof this.app.get(eventName) === 'function'
  ) {
    return this.app.get(eventName).call(this, data);
  }
};
