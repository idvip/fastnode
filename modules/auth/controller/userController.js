const userService = require('../service/userService.js');
module.exports = function(c){
    c.rule({
        method:"post"
    })
    //登录
    c("/login",userService.login);
    //修改密码
    c("/changepwd",userService.changePwd);
    //退出登录
    c("logout",userService.logout);

    c("/test","get",function () {
        return userService.addUser("admin","admin","admin",{name:"zs"});
    })

    c.bind("user");
}
