const Sequelize = require('sequelize');
const connection = require('./Connection');

const ProductModel = connection.define('product', {
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
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    description: {
        type: Sequelize.STRING,
        allowNull: false
    },
    product_consignment: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cancellation_act: {
        type: Sequelize.INTEGER,
        allowNull: true
    },
    price: {
        type: Sequelize.DOUBLE,
        allowNull: false
    },
    count: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    cancelled_count: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'product'
});

module.exports = ProductModel;