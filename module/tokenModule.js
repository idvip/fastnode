const tools = require('../common/tools.js');
const config = require('../engine/configEngine.js');
const redisHelper = require('../common/redisHelper.js');

async function getUserByToken(token) {
    let userStr = await redisHelper().get("TOKEN_"+token);
    return JSON.parse(userStr);
}

async function getTokenByUser(user){
    let token = tools.getPwd(JSON.stringify(user)+new Date().getTime(),'token');
    await redisHelper().set("TOKEN_"+token,JSON.stringify(user));
    await redisHelper().expire("TOKEN_"+token,config.tokenExpire || 24*60*60);
    return token;
}
async function removeToken(token) {
    await redisHelper().del("TOKEN_"+token);
}


module.exports = {
    getUserByToken,
    getTokenByUser,
    removeToken
}