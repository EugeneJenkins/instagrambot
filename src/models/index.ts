import UserModel from './User';
import ProxyModel from './Proxy';
import DeviceModel from './Device';
import SessionModel from './Session';
import sequelize from "../database";

const models = {
    User: UserModel(sequelize),
    Proxy: ProxyModel(sequelize),
    Device: DeviceModel(sequelize),
    Session: SessionModel(sequelize),
};

Object.keys(models).forEach((modelName) => {
    if (models[modelName].associate) {
        models[modelName].associate(models);
    }
});

export default models;
