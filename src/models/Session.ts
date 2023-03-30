import {DataTypes, Model, Sequelize} from "sequelize";

interface SessionAttributes {
    id: number;
    session: string;
    proxyId: number;
    deviceId: number;
    accountId: number;
    createdAt: Date;
    updatedAt: Date;
}

class Session extends Model<SessionAttributes> implements SessionAttributes {
    public id: number;
    public createdAt!: Date;
    public updatedAt!: Date;
    public accountId: number;
    public deviceId: number;
    public proxyId: number;
    public session: string;
}

export default (sequelize: Sequelize) => {

    Session.init({
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
        session: {
            type: DataTypes.JSON,
            allowNull: false
        },
        accountId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: "users",
                key: "id"
            },
            onDelete: 'CASCADE',
        },
        deviceId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: "devices",
                key: "id"
            },
            onDelete: 'CASCADE',
        },
        proxyId: {
            type: DataTypes.INTEGER.UNSIGNED,
            references: {
                model: "proxies",
                key: "id"
            },
            onDelete: 'CASCADE',
        },
    }, {
        tableName: "sessions",
        sequelize,
        hooks: {
            beforeCreate: (session: Session) => {
                session.createdAt = new Date();
                session.updatedAt = new Date();
            },
            beforeUpdate: (session: Session) => {
                session.updatedAt = new Date();
            },
        },
    })

    return Session;
}