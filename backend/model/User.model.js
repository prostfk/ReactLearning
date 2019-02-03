const Sequelize = require('sequelize');
const connection = require('./Connection');
const Company = require('./Company.model');
const UserModel = connection.define('user', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: Sequelize.STRING,
        allowNull: false
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    role: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    surname: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true
        }
    },
    birth_day: {
        type: Sequelize.STRING,
        allowNull: false
    },
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    passport: {
        type: Sequelize.STRING,
        allowNull: true
    },

}, {
    timestamps: false
});
UserModel.belongsTo(Company, {foreignKey: 'id', target: 'company_id'});


module.exports = UserModel;