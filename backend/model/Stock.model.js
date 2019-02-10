const Sequelize = require('sequelize');
const connection = require('./Connection');

const StockModel = connection.define('stock', {
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
    address: {
        type: Sequelize.STRING,
        allowNull: false
    },
    active: {
        type: Sequelize.BOOLEAN,
        allowNull: false,
    },
    lat: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    lng: {
        type: Sequelize.DOUBLE,
        allowNull: false,
    },
    companyId: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
}, {
    timestamps: false,
    tableName: 'stock'
});

module.exports = StockModel;