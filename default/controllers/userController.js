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
    }, async function (username, password) {
        let user = await userService.login(username, password);
        //todo:目前使用session管理登录，以后可以改成token
        this.req.session.loginUser = user;
        return user;
    });
    //获取登录用户信息
    this.get('/info', function () {
        return this.user;
    })
    //修改密码
    this("/changepwd", async function (oldpass, newpass) {
        let newUser = await userService.changePwd(oldpass, newpass, this.user);
        this.req.session.loginUser = newUser;
    });
    //退出登录
    this("/logout", function () {
        this.req.session.loginUser = null;
     });

    this("/test", "get", function () {
        return userService.addUser("admin", "admin", "admin", {name: "zs"});
    })

    this.bind("user");
}
