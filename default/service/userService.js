const tools = require('../../common/tools.js');
const rst = require('../../common/ResultModel.js');
const db = require('../../db/dataModule.js');
let u = db.instance('user');

module.exports = {
    login: async function (username, password) {
        if (!username || !password) rst.fail('用户名或密码为空');
        let data = {
            username,
            password: tools.getPwd(password)
        };
        let rs = await u.findOne(data);
        if (!rs) {
            rst.fail('用户名或密码错误');
        }
        return rs;
    },

    changePwd: async function (oldpwd, pwd, user) {
        if (pwd && oldpwd && pwd !== oldpwd) {
            if (user.password === tools.getPwd(oldpwd)) {
                user.password = tools.getPwd(pwd);
                return u.updateObject(user);
            } else {
                rst.fail('旧密码错误');
            }
        } else {
            rst.fail("缺少参数或新旧密码相同");
        }
    },
    addUser: function (username, password, role, extend) {
        const u = db.instance('user');
        return u.add({username, password: tools.getPwd(password), role, extend})
    }
}
