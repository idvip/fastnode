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

    c("/test","get",function (req,res,next) {
        return userService.addUser("admin","admin","admin",{name:"zs"}).then(function (rs) {
            res.json(rs);
        }).catch(function (err) {
            next(err);
        })
    })

    c.bind("user");
}