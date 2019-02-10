const Sequelize = require('sequelize');
const connection = require('./Connection');

const ConsignmentModel = connection.define('consignment', {
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
    order_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
}, {
    timestamps: false,
    tableName: 'consignment'
});

module.exports = ConsignmentModel;