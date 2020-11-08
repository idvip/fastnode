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
    var key = type + '4789*(^&FHJIDY#^ufdsh43287fhaj978789' + type;
    return md5(pwd + key);
}

function isObjectId(id){
    return id && mongoose.Types.ObjectId.isValid(id);
}

module.exports={
    mergeObj,
    getPwd,
    isObjectId
}