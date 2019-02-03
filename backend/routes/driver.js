const roles = require('../constants/roles');
const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/orders', (req, resp) => {
    security.checkRole(req, resp, roles.DRIVER, () => {
        let db = new Database();
        let userInfo = security.getUserInfo(req);
        db.executeQuery('SELECT orders.name, orders.client,orders.date_departure,orders.date_arrival, orders.id FROM orders JOIN waybill w on orders.waybill_id = w.id WHERE driver_id=? AND company=?', [userInfo.id, userInfo.companyId]).then(data => {
            resp.json(data);
        })
    })
});

router.get('/order/:id', (req, resp) => {
    security.checkRole(req, resp, roles.DRIVER, () => {
        let db = new Database();
        let userInfo = security.getUserInfo(req);
        let response = {};
        db.executeQuery('SELECT orders.name, orders.client,orders.date_departure,orders.date_arrival, orders.id, w.id as wayId FROM orders JOIN waybill w on orders.waybill_id = w.id WHERE driver_id=? AND company=? AND orders.id=?', [userInfo.id, userInfo.companyId, req.params.id]).then(data => {
            if (data.length > 0) {
                response.order = data[0];
                let waybill = data[0].wayId;
                db.executeQuery('SELECT * FROM route_points WHERE waybill=?', waybill).then(routePoints => {
                    response.points = routePoints;
                    resp.json(response);
                })
            } else {
                resp.json(response);
            }
        });
    });
});

module.exports = router;