const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');
const sequelize = require("../model/Connection");
const Company = require("../model/Company.model");
const Waybill = require("../model/Waybill.model");
const Order = require("../model/Order.model");
const Consignment = require("../model/Consignment.model");
const Product = require("../model/Product.model");
const Stock = require("../model/Stock.model");
const RoutePoint = require("../model/RoutePoint.model");

router.get('/freeDrivers', (req, resp) => {
    let params = require('url').parse(req.url, true).query;
    let {dd, da} = params;
    if (dd && da) {
        let db = new Database();
        security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
            let userDetails = security.getUserInfo(req);
            db.executeQuery(`SELECT DISTINCT d.id, username,name, surname FROM users d 
            LEFT JOIN waybill w2 on d.id = w2.driver_id
            WHERE ((w2.date_departure NOT BETWEEN ${dd} AND ${da}) AND
                   (w2.date_arrival NOT BETWEEN ${dd} AND ${da}) 
                     OR (w2.date_arrival IS NULL AND w2.date_departure IS NULL )) 
              AND d.company_id=${userDetails.companyId} AND role='ROLE_DRIVER'`).then(data => {
                resp.json(data);
            })
        });
    } else {
        resp.json({error: 'no date params(dd and da)'});
    }
});

router.get('/clients', (req, resp) => {
    security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
        let db = new Database();
        let userData = security.getUserInfo(req);
        db.executeQuery('SELECT * FROM client WHERE owner=?', userData.companyId).then(data => {
            resp.json(data);
        })
    });
});

router.get('/freeAutos', (req, resp) => {
    let params = require('url').parse(req.url, true).query;
    let {dd, da} = params;
    console.log(dd, da);
    if (dd && da) {
        let db = new Database();
        security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
            let userDetails = security.getUserInfo(req);
            db.executeQuery(`SELECT DISTINCT d.id,name,carNumber,type, fuelConsumption,companyId,active FROM autos d 
            LEFT JOIN waybill w2 on d.id = w2.auto
            WHERE ((w2.date_departure NOT BETWEEN ${dd} AND ${da}) AND
                   (w2.date_arrival NOT BETWEEN ${dd} AND ${da}) 
                     OR (w2.date_arrival IS NULL AND w2.date_departure IS NULL )) 
              AND d.companyId=${userDetails.companyId}`).then(data => {
                resp.json(data);
            })
        });
    } else {
        resp.json({error: 'no date params(dd and da)'});
    }

});


router.get('/stocks', (req, resp) => {
    security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
        let db = new Database();
        let userInfo = security.getUserInfo(req);
        db.executeQuery('SELECT * FROM stock WHERE companyId=? AND active=1', userInfo.companyId).then(data => {
            resp.send(data);
        })
    });
});

router.post('/addOrder', (req, resp) => {

    security.checkRole(req, resp, 'ROLE_DISPATCHER', async () => {
        let {name, client, status, sender, receiver, dd, da, waybill_status, driver, auto, consignment} = req.body;
        consignment = JSON.parse(consignment);
        dd = CommonUtil.reformatDate(dd);
        da = CommonUtil.reformatDate(da);
        console.log(req.body);
        let userInfo = security.getUserInfo(req);
        let company = await Company.findOne({where: {id: userInfo.companyId}}).then(company => company);
        console.log(company);
        if (!company.active) {
            resp.json({error: 'Your company blocked by admin'});
        }
        if (ValidationUtil.validateOrder({name, client, status, sender, receiver,
            dd, da, waybill_status, driver, auto, consignment})) {
            let transaction = await sequelize.transaction();
            try {
                let savedWaybill = await Waybill.create({
                        status: 1, driver_id: driver, auto,
                        date_departure: dd, date_arrival: da, user_id: null
                    },
                    {transaction: transaction}).then(waybill => waybill);
                let savedOrder = await Order.create({
                    name: name, client, status: 1, sender, receiver, date_departure: dd,
                    date_arrival: da, waybill_id: savedWaybill.id, 'company_id': Number(company.id)
                }, {transaction: transaction}).then(order => order);
                let savedConsignment = await Consignment.create({
                        name: new Date().toLocaleDateString('ru'), order_id: savedOrder.id
                    },
                    {transaction: transaction}).then(consignment => consignment);
                let senderStock = await Stock.findOne({where: {companyId: company.id, id: sender}});
                let receiverStock = await Stock.findOne({where: {companyId: company.id, id: receiver}});
                let start = await RoutePoint.create({
                    name: "Start",
                    marked: false,
                    lat: senderStock.lat,
                    lng: senderStock.lng,
                    waybill: savedWaybill.id,
                }, {transaction: transaction}).then(point=>point);
                let end = await RoutePoint.create({
                    name: "End",
                    marked: false,
                    lat: receiverStock.lat,
                    lng: receiverStock.lng,
                    waybill: savedWaybill.id,
                }, {transaction: transaction}).then(point=>point);
                let products = [];
                consignment.forEach(async product => {
                    let savedProduct = await Product.create({
                        name: product.name,
                        status: 1,
                        description: product.description,
                        product_consignment: savedConsignment.id,
                        cancellation_act: null,
                        price: product.price,
                        count: product.count,
                        cancelled_count: 0
                    }, {transaction: transaction}).then(sProduct => sProduct);
                    products.push(savedProduct);
                });
                transaction.commit();
                if (savedOrder && savedWaybill && savedConsignment && start && end){
                    resp.json({order: savedOrder.id});
                }else{
                    resp.json({error: 'Cannot save: commit is undefined'});
                }
            }catch (e) {
                console.log(e);
                transaction.rollback();
                resp.json({error: e.toString()})
            }
        } else {
            resp.json({error: 'Check data'});
        }
    });

});


module.exports = router;
