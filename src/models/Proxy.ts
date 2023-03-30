import {Model, DataTypes, Sequelize} from 'sequelize';

interface ProxyAttributes {
    id: number;
    ipAddress: string;
    port: number;
    code: string;
    country: string;
    enabled: boolean;
    createdAt: Date;
    updatedAt: Date;
    https: boolean;
}

class Proxy extends Model<ProxyAttributes> implements ProxyAttributes {
    public id!: number;
    public code!: string;
    public country!: string;
    public enabled!: boolean;
    public ipAddress!: string;
    public port!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public https!: boolean;
}

export default (sequelize: Sequelize) => {
    Proxy.init({
            id: {
                type: DataTypes.INTEGER.UNSIGNED,
                autoIncrement: true,
                primaryKey: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            updatedAt: {
                type: DataTypes.DATE,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
            },
            ipAddress: {
                type: DataTypes.STRING(16),
                allowNull: false
            },
            port: {
                type: DataTypes.INTEGER.UNSIGNED,
                allowNull: false
            },
            code: {
                type: DataTypes.STRING(3),
                allowNull: true
            },
            country: {
                type: DataTypes.STRING(50),
                allowNull: true
            },
            enabled: {
                type: DataTypes.BOOLEAN,
                defaultValue: true
            },
            https: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                defaultValue: true
            }
        }, {
            tableName: "proxies",
            sequelize,
            indexes: [
                {
                    unique: true,
                    fields: ['ipAddress', "port"]
                },
            ],
            hooks: {
                beforeCreate: (proxy: Proxy) => {
                    proxy.createdAt = new Date();
                    proxy.updatedAt = new Date();
                },
                beforeUpdate: (proxy: Proxy) => {
                    proxy.updatedAt = new Date();
                },
            },
        }
    )

    return Proxy;
}