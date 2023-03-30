import {DataTypes, Model, Sequelize} from "sequelize";

interface DeviceAttributes {
    id: number;
    agent: string;
    width: number;
    height: number;
    display: number;
    createdAt: Date;
    updatedAt: Date;
}

class Device extends Model<DeviceAttributes> implements DeviceAttributes {
    public id!: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public agent!: string;
    public display!: number;
    public height!: number;
    public width!: number;
}

export default (sequelize: Sequelize) => {
    Device.init({
        id: {
            type: DataTypes.INTEGER.UNSIGNED,
            autoIncrement: true,
            primaryKey: true
        },
        createdAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        updatedAt: {
            type: DataTypes.DATE,
            defaultValue: Sequelize.literal('CURRENT_TIMESTAMP'),
        },
        agent: {
            type: DataTypes.TEXT,
            allowNull: false
        },
        display: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        height: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        width: {
            type: DataTypes.INTEGER,
            allowNull: false
        }
    }, {
        tableName: "devices",
        sequelize,
        hooks: {
            beforeCreate: (device: Device) => {
                device.createdAt = new Date();
                device.updatedAt = new Date();
            },
            beforeUpdate: (device: Device) => {
                device.updatedAt = new Date();
            },
        }
    })

    return Device;
}