import {Model, DataTypes, Sequelize} from 'sequelize';

interface UserAttributes {
    id: number;
    username: string;
    email: string;
    password: string;
    isPrivate: boolean;
    isBanned: boolean;
    createdAt: Date;
    updatedAt: Date;
}

class User extends Model<UserAttributes> implements UserAttributes {
    public createdAt!: Date;
    public updatedAt!: Date;
    public id!: number;
    public username!: string;
    public email!: string;
    public password!: string;
    public isPrivate!: boolean;
    public isBanned!: boolean;
}

export default (sequelize: Sequelize) => {
    User.init(
        {
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
            username: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true
            },
            email: {
                type: DataTypes.STRING(50),
                allowNull: false,
                unique: true,
            },
            password: {
                type: DataTypes.STRING(100),
                allowNull: false
            },
            isBanned: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            },
            isPrivate: {
                type: DataTypes.BOOLEAN,
                defaultValue: false
            }
        },
        {
            tableName: 'users',
            sequelize,
            hooks: {
                beforeCreate: (user: User) => {
                    user.createdAt = new Date();
                    user.updatedAt = new Date();
                },
                beforeUpdate: (user: User) => {
                    user.updatedAt = new Date();
                },
            },
        },
    );

    return User;
};
