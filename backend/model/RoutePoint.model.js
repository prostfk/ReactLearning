const Sequelize = require('sequelize');
const connection = require('./Connection');

const RoutePointModel = connection.define('routePoint', {
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
    },
    marked: {
        type: Sequelize.BOOLEAN,
        allowNull: false
    },
    lat: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    lng: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    waybill: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'route_points'
});

module.exports = RoutePointModel;