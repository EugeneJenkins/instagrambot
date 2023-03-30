import {Sequelize} from 'sequelize';
import config from "../config";

const sequelize = new Sequelize(
    config.DatabaseConfigs.database,
    config.DatabaseConfigs.username,
    config.DatabaseConfigs.password,
    {
        host: config.DatabaseConfigs.host,
        dialect: "mysql",
        port: config.DatabaseConfigs.port
    });

export default sequelize;
