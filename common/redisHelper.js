var redis = require("redis");
const { promisify } = require('util');
var option = require('../engine/configEngine.js');

module.exports = function (mconfig) {
    if (mconfig) {
        return new RedisHelper(mconfig);
    } else {
        return new RedisHelper(option.redis_config);
    }
};
let self_config;
function RedisHelper(config) {
    self_config = config;
}

//只使用一个连接

function initClient() {
    var _client = null;
    if (self_config.options) {
        _client = redis.createClient(self_config.port, self_config.host, self_config.options);
    } else if (self_config.password) {
        _client = redis.createClient(self_config.port, self_config.host, {password: self_config.password});
    } else {
        _client = redis.createClient(self_config.port, self_config.host);
    }
    _client.on('error', function (err) {
        console.log('Error ' + err);
    });
    return _client
}

RedisHelper.prototype.incr = function (key) {
    var client = initClient();
    client.incr(key, function (err, item) {
        //callback(err, item);
        // client.quit();
    })
};

RedisHelper.prototype.keys = function (key, callback) {
    var client = initClient();
    client.keys(key, function (err, items) {
        callback(null, items);
        // client.quit();
    })
};

RedisHelper.prototype.set = function (key, value) {
    var client = initClient();
    const setAsync = promisify(client.set).bind(client);
    return setAsync(key, value);
};

RedisHelper.prototype.expire = function (key, ttl) {
    var client = initClient();
    const setAsync = promisify(client.expire).bind(client);
    return setAsync(key, ttl);
};

RedisHelper.prototype.get = function (key, callback) {
    var client = initClient();
    const getAsync = promisify(client.get).bind(client);
    return getAsync(key);
};

RedisHelper.prototype.del = function (key, callback) {
    var client = initClient();
    const delAsync = promisify(client.del).bind(client);
    return delAsync(key);
};

