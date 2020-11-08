const tools = require('../../../common/tools.js');
const rst = require('../../../common/result.js');
const db = require('../../../db/dataModule.js');

module.exports={
    login: function (req, res, next) {
        var u = db.instance('user');
        var data = {
            username: req.body.username,
            password: tools.getPwd(req.body.password)
        };
        if (!data.username || !req.body.password) rst.fail('用户名或密码为空').out(res);
        u.findOne(data).then(function (rs) {
            if (rs) {
                //todo:目前使用session管理登录，以后可以改成token
                req.session.loginUser = rs;
                rst.success('ok', rs).out(res);
            } else {
                rst.fail('用户名或密码错误').out(res);
            }
        }).catch(next);
    },
    logout: function (req, res, next) {
        req.session.loginUser = null;
        rs.success('注销成功').out(res);
    },
    changePwd: function (req, res, next) {
        var c = db.instance('user');
        var pwd = req.body.newpass;
        var oldpwd = req.body.oldpass;
        var id = req.body.id;
        if (pwd && oldpwd && id && pwd !== oldpwd) {
            console.log(tools.getPwd(oldpwd));
            return c.findOne({_id: id, password: tools.getPwd(oldpwd), status: 0}).then(function (user) {
                if (user) {
                    user.password = tools.getPwd(pwd);
                    return c.save(user).then(function () {
                        rst.success("修改成功").out(res);
                    })
                } else {
                    rst.fail('旧密码错误').out(res);
                }
            })
        } else {
            rst.fail("缺少参数或新旧密码相同").out(res);
        }
    },
    addUser:function (username,password,role,extend) {
        var u = db.instance('user');
        return u.add({username,password:tools.getPwd(password),role,extend})
    }
}