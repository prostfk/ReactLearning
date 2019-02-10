const roles = require('../constants/roles');
const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');
const Order = require('../model/Order.model');
const Waybill = require('../model/Waybill.model');

router.get('/orders', (req, resp) => {
    security.checkRole(req, resp, roles.DRIVER, () => {
        let userInfo = security.getUserInfo(req);
        Order.findAll({
            where: {'company_id': userInfo.companyId,
                driver_id: userInfo.id},
            include: [{model: Waybill}]
        }).then(order=>resp.json(order)).catch(e=>resp.json({error: e.toString()}));
    })
});

router.get('/order/:id', (req, resp) => {
    security.checkRole(req, resp, roles.DRIVER, async () => {
        let db = new Database();
        let userInfo = security.getUserInfo(req);
        let response = {};
        let order = await Order.findOne({
            where: {id: req.params.id,
                    company_id: userInfo.companyId}
        }).then(order=>order);
        db.executeQuery('SELECT orders.name, orders.client,orders.date_departure,orders.date_arrival, orders.id, w.id as wayId FROM orders JOIN waybill w on orders.waybill_id = w.id WHERE driver_id=? AND company_id=? AND orders.id=?', [userInfo.id, userInfo.companyId, req.params.id]).then(data => {
            if (data.length > 0) {
                response.order = order;
                let waybill = order.waybill_id;
                db.executeQuery('SELECT * FROM route_points WHERE waybill=?', waybill).then(routePoints => {
                    response.points = routePoints;
                    resp.json(response);
                })
            } else {
                resp.json({error: 'No such order'});
            }
        });
    });
});

module.exports = router;