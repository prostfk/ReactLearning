const roles = require('../constants/roles');
const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/orders', (req,resp)=>{
    security.checkRole(req,resp, roles.DRIVER, ()=>{
        let db = new Database();
        let userInfo = security.getUserInfo(req);
        db.executeQuery('SELECT orders.name, orders.client,orders.date_departure,orders.date_arrival, orders.id FROM orders JOIN waybill w on orders.waybill = w.id WHERE driver=? AND company=?', [userInfo.id, userInfo.companyId]).then(data=>{
            resp.json(data);
        })
    })
});

module.exports = router;