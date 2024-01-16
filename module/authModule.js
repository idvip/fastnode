const ResultModel = require('../common/ResultModel.js');
const tokenModule = require('./tokenModule.js');

//权限校验中间件，目前只处理了 指定角色权限，登录权限，todo:尚未处理数据权限（水平越权未处理）
function authMiddleware(rule) {
    return async function (req, res, next) {
        if (rule.login) {
            let authorization = req.get('Authorization');
            let token = null;
            if (authorization) {
                let tarr = authorization.split(' ');
                if(tarr.length===2){
                    if(tarr[0] === "Bearer"){
                         token = tarr[1];
                    }
                }
                if(token) {
                    let user = await tokenModule.getUserByToken(token)
                    if (user) {
                        if (rule.role) {
                            if (rule.role.filter(a => user.role.indexOf(a) > -1).length < 1) next(new ResultModel(ResultModel.codes.noauth, '无权限'));
                        }
                        req.user = user;
                        req.token = token;
                        return next();
                    }
                }
            } else {
                return next(new ResultModel(ResultModel.codes.nologin, 'token为空'))
            }
            return next(new ResultModel(ResultModel.codes.nologin, '未登录'))
        }
        return next();
    }
}

module.exports = {
    authMiddleware
}