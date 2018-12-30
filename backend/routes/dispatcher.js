const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/orders', (req, resp) => {

    security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
        let db = new Database();
        let userDetails = security.getUserInfo(req);
        db.executeQuery(`SELECT *
                         FROM orders WHERE company =${userDetails.companyId}`).then(data => {
            resp.json(data);
        })
    });
});

router.get('/freeDrivers', (req, resp) => {
    let {dd, da} = req.params;
    if (dd && da) {
        let db = new Database();
        security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
            let userDetails = security.getUserInfo(req);
            db.executeQuery(`SELECT DISTINCT * FROM users d 
            LEFT JOIN waybill w2 on d.id = w2.driver
            WHERE ((w2.date_departure NOT BETWEEN ${dd} AND ${da}) AND
                   (w2.date_arrival NOT BETWEEN ${dd} AND ${da}) 
                     OR (w2.date_arrival IS NULL AND w2.date_departure IS NULL )) 
              AND d.company_id=${userDetails.companyId}`).then(data => {
                resp.json(data);
            })
        });
    } else {
        resp.json({error: 'no date params(dd and da)'});
    }
});

router.get('/clients', (req,resp)=>{
    security.checkRole(req,resp,'ROLE_DISPATCHER', ()=>{
        let db = new Database();
        let userData = security.getUserInfo(req);
        db.executeQuery('SELECT * FROM client WHERE owner=?', userData.companyId).then(data=>{
            resp.json(data);
        })
    });
});

router.get('/freeAutos', (req, resp) => {
    let {dd, da} = req.params;
    if (dd && da) {
        let db = new Database();
        security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
            let userDetails = security.getUserInfo(req);
            db.executeQuery(`SELECT DISTINCT * FROM autos d 
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

router.post('/addOrder', (req, resp) => {

    security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
        let {name, client, status, sender, receiver, date_departure, date_arrival, waybill_status, driver, auto, consignment} = req.body;
        consignment = JSON.parse(consignment);
        let userInfo = security.getUserInfo(req);
        if (ValidationUtil.validateOrder({name,client,status,sender,receiver,date_departure, date_arrival, waybill_status, driver, auto, consignment})){
            let db = new Database();
            db.query('INSERT INTO waybill(status, driver, auto, date_departure, date_arrival, user_id) VALUES (?,?,?,?,?,?)',
                [status,driver,auto, date_departure,date_arrival,null]).then(data=>{
                    db.executeQuery('SELECT * FROM waybill ORDER BY id DESC LIMIT 1').then(data=>{
                        let wayId = data.id;
                        db.query('INSERT INTO orders(name, client, status, sender, receiver, date_departure, date_arrival, waybil, company) VALUES (?,?,?,?,?,?,?,?,?)',
                            [name,client,status,sender,receiver,date_departure,date_arrival,wayId,userInfo.companyId]).then(data=>{
                                resp.json({status: 'Saved'});
                        })
                    });
            })
        }else{
            resp.json({error: 'Check data'});
        }
    });

});


module.exports = router;
