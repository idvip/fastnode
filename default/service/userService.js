const tools = require('../../common/tools.js');
const rst = require('../../common/ResultModel.js');
const db = require('../../db/dataModule.js');

module.exports={
    login: async function (username,password) {
        if (!username || !password) return rst.fail('用户名或密码为空');
        let u = db.instance('user');
        let data = {
            username,
            password: tools.getPwd(password)
        };
        let rs = await u.findOne(data);
        if (rs) {
            //todo:目前使用session管理登录，以后可以改成token
            this.req.session.loginUser = rs;
            return rst.success('ok', rs);
        } else {
            return rst.fail('用户名或密码错误');
        }
    },
    logout: function () {
        this.req.session.loginUser = null;
        return rst.success('注销成功');
    },
    changePwd:async function (newpass,oldpass,id) {
        let c = db.instance('user');
        let pwd =newpass;
        let oldpwd = oldpass;
        if (pwd && oldpwd && id && pwd !== oldpwd) {
            console.log(tools.getPwd(oldpwd));
            let user = await c.findOne({_id: id, password: tools.getPwd(oldpwd), status: 0});
            if (user) {
                user.password = tools.getPwd(pwd);
                await c.save(user);
                return rst.success("修改成功");
            } else {
                return rst.fail('旧密码错误');
            }
        } else {
            return rst.fail("缺少参数或新旧密码相同");
        }
    },
    addUser:function (username,password,role,extend) {
        const u = db.instance('user');
        return u.add({username,password:tools.getPwd(password),role,extend})
    }
}
