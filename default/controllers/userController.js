const userService = require('../service/userService.js');
module.exports = function () {
    //默认规则
    this.rule({
        method: "post",
        path: '/user',
        login: true
    })
    //登录
    this({
        path: "/login",
        login: false
    }, userService.login);
    //获取登录用户信息
    this.get('/info', function () {
        return this.user;
    })
    //修改密码
    this("/changepwd", userService.changePwd);
    //退出登录
    this("/logout", userService.logout);

    this("/test", "get", function () {
        return userService.addUser("admin", "admin", "admin", {name: "zs"});
    })

    this.bind("user");
}
