const Sequelize = require('sequelize');
const connection = require('./Connection');
const Company = require('./Company.model');
const Waybill = require('./Waybill.model');
const OrderModel = connection.define('order', {
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
    client: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    status: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    sender: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    receiver: {
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
    company_id: {
        type: Sequelize.INTEGER,
        allowNull: false
    }
    // waybill: {
    //     type: Sequelize.INTEGER,
    //     allowNull: true,
    //     references:{
    //         model: 'waybill',
    //         key: 'id'
    //     }
    // },

}, {
    timestamps: false
});
OrderModel.belongsTo(Company, {foreignKey: 'company_id'});
OrderModel.belongsTo(Waybill, {foreignKey: 'waybill_id', target: 'waybill'});

module.exports = OrderModel;