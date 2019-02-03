const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');
const Order = require('../model/Order.model');
const User = require('../model/User.model');
const Waybill = require('../model/Waybill.model');

router.get('/:role/orders', (req, resp) => {
    let role = req.params.role;
    let userDetails = security.getUserInfo(req);
    if (role === 'admin' || role === 'dispatcher' || role === 'owner' || role === 'manager') {
        security.checkRole(req, resp, ['ROLE_DISPATCHER', 'ROLE_OWNER', 'ROLE_MANAGER', "ROLE_DISPATCHER"], () => {
            let db = new Database();
            db.executeQuery(`SELECT *
                             FROM orders WHERE company =${userDetails.companyId}`).then(data => {
                resp.json(data);
            })
        });
    } else if (role === 'driver') {
        security.checkRole(req,resp,'ROLE_DRIVER', ()=>{
            Order.findAll({
                where: {company: userDetails.companyId},
                include: [{
                    model: Waybill,
                    required: true,
                    include: [{
                        model: User,
                        required: true,
                        where: {id: userDetails.id}
                    }]
                }]
            }).then(data=>{
                resp.json(data);
            });
        })
    } else {
        resp.sendStatus(404);
    }
});

router.get('/:role/users', (req,resp)=>{
    let role = req.params.role;
    if (role === 'admin' || role === 'owner'){
        security.checkRole(req,resp,['ROLE_ADMIN','ROLE_OWNER'], ()=>{
            let userDetails = security.getUserInfo(req);
            User.findAll({
                where: {company_id: userDetails.companyId}
            }).then(data=>{
                resp.json(data);
            })
        });
    }else {
        resp.sendStatus(401);
    }
});

router.get('/:role/stocks', (req, resp) => {
    let role = req.params.role;
    if (role === 'admin' || role === 'dispatcher' || role === 'owner') {
        security.checkRole(req, resp, ['ROLE_DISPATCHER', 'ROLE_ADMIN', "ROLE_OWNER"], () => {
            let db = new Database();
            let userDetails = security.getUserInfo(req);
            db.executeQuery('SELECT * FROM stock WHERE companyId=?', userDetails.companyId).then(data => {
                resp.json(data);
            })
        })
    } else {
        resp.sendStatus(401);
    }
});
module.exports = router;