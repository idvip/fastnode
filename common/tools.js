const md5 = require('md5');
const mongoose = require('mongoose');

function mergeObj(a,b) {
    a=a||{};
    b=b||{};
    var obj = {};
    for(p in a){
        obj[p] = a[p];
    }
    for(p in b){
        obj[p] = b[p];
    }
    return obj;
}

function getPwd(pwd, type) {
    type = type || '';
    var key = type + '478fdsa9*(d321^&FHJIDY#^ufdsh43287fhaj9fds7878eeDDFF9' + type;
    return md5(pwd + key);
}

function isObjectId(id){
    return id && mongoose.Types.ObjectId.isValid(id);
}

module.exports={
    mergeObj,
    getPwd,
    isObjectId,
    //公开mongoose的ObjectID,便于创建实体类型为ObjectId的字段
    ObjectId:mongoose.Types.ObjectId
}
