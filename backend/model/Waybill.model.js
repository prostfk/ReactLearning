const Sequelize = require('sequelize');
const connection = require('./Connection');
const User = require('./User.model');
const WaybillModel = connection.define('waybill', {
    id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        unique: true,
        autoIncrement: true,
        primaryKey: true
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    driver_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    auto: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    date_departure: {
        type: Sequelize.STRING,
        allowNull: true
    },
    date_arrival: {
        type: Sequelize.STRING,
        allowNull: true
    },
    user_id: {
        type: Sequelize.INTEGER,
        allowNull: true
    }

}, {
    timestamps: false,
    tableName: 'waybill'
});
WaybillModel.belongsTo(User, {foreignKey: 'driver_id'});

module.exports = WaybillModel;