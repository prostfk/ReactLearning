const roles = require('../constants/roles');
const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/orders', (req, resp) => {
    security.checkRole(req, resp, roles.MANAGER, () => {
        let userInfo = security.getUserInfo(req);
        let db = new Database();
        db.executeQuery('SELECT orders.name, orders.client,orders.date_departure,orders.date_arrival, orders.id, w.id as wayId FROM orders JOIN waybill w on orders.waybill_id = w.id WHERE company_id=? ', userInfo.companyId).then(data => {
            resp.json(data)
        })
    });
});

router.get('/order/:id', (req,resp)=>{
    security.checkRole(req,resp,roles.MANAGER,()=>{
        let userInfo = security.getUserInfo(req);
        let db = new Database();
        db.executeQuery('SELECT * FROM route_points JOIN waybill w on route_points.waybill = w.id JOIN orders o on w.id = o.waybill_id WHERE o.id=? AND company_id=?',[req.params.id, userInfo.companyId]).then(data=>{
            resp.json(data);
        })

    });
});

module.exports = router;