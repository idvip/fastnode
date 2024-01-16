const userService = require('../service/userService.js');
const config = require('../../engine/configEngine.js');
const tokenModule = require('../../module/tokenModule.js');

module.exports = function (c) {
    //默认规则
    c.rule({
        method: "post",
        path: config.user_path || '/user',
        login: true
    })
    //登录
    c({
        path: "/login",
        login: false
    }, async function (username, password) {
        console.log(33)
        let user = await userService.login(username, password);
        let token = await tokenModule.getTokenByUser(user);
        return {
            token,
            user
        };
    });
    //获取登录用户信息
    c.get('/info', function () {
        return this.user;
    })
    //修改密码
    c("/changepwd", async function (oldpass, newpass) {
        this.req.session.loginUser = await userService.changePwd(oldpass, newpass, this.user);
    });
    //退出登录
    c("/logout", function () {
        tokenModule.removeToken(this.token);
    });

    c.get({path: "/test", login: false}, function () {
        return userService.addUser("admin", "admin", "admin", {name: "zs"});
    })

    c.bind("user");
}
