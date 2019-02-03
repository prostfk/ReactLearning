const Sequelize = require('sequelize');
const connection = require('./Connection');

const CompanyModel = connection.define('company', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: Sequelize.STRING,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'company'
});

module.exports = CompanyModel;