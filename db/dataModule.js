/*
* 数据访问父类
* 也可直接使用该类实例化 来访问数据库 ，如无特别业务无需建立子类
* */
const config = require('../engine/configEngine.js');
const mongoose = require('mongoose');
//连接数据库
mongoose.connect(config.mongodb_conn, {useNewUrlParser: true, useUnifiedTopology: true});

//mongoose实体
let models = null;

class DataModule {
    constructor(model) {
        if (typeof model === 'string') {
            if (!models[model]) {
                throw new Error('model not defined');
            }
            this.model = models[model];
        } else {
            this.model = model;
        }
    }

    add(data) {
        return this.model.create(data)
    }

    delete(condition) {
        return this.model.deleteMany(condition);
    }

    update(condition, data) {
        return this.model.update(condition, data);
    }

    find(condition, filed) {
        return this.model.find(condition, filed);
    }

    //保存数据（必须是通过find出来的数据实体）
    save(entity) {
        return entity.save();
    }

    updateObject(object) {
        return this.model.update({_id: object._id}, object);
    }

    findOne(condition) {
        return this.model.findOne(condition)
    }

    count(condition) {
        return this.model.count(condition);
    }

    findById(id) {
        return this.model.findById(id)
    }

}

DataModule.instance = (modelName) => {
    return new DataModule(modelName);
}


//绑定实体对象
DataModule.init = (mongooseModels) => {
    if (mongooseModels)
        models = mongooseModels;
}

//使用时需要传递models进来
module.exports = DataModule;
