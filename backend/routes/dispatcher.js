const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/freeDrivers', (req, resp) => {
    let params = require('url').parse(req.url,true).query;
    let {dd, da} = params;
    if (dd && da) {
        let db = new Database();
        security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
            let userDetails = security.getUserInfo(req);
            db.executeQuery(`SELECT DISTINCT d.id, username,name, surname FROM users d 
            LEFT JOIN waybill w2 on d.id = w2.driver
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
    let params = require('url').parse(req.url,true).query;
    let {dd, da} = params;
    console.log(dd,da);
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


router.get('/stocks', (req,resp)=>{
    security.checkRole(req,resp,'ROLE_DISPATCHER', ()=>{
        let db = new Database();
        let userInfo = security.getUserInfo(req);
        db.executeQuery('SELECT * FROM stock WHERE companyId=? AND active=1', userInfo.companyId).then(data=>{
            resp.send(data);
        })
    });
});

router.post('/addOrder', (req, resp) => { //todo: add transactions and ORM operations!

    security.checkRole(req, resp, 'ROLE_DISPATCHER', () => {
        let {name, client, status, sender, receiver, dd, da, waybill_status, driver, auto, consignment} = req.body;
        consignment = JSON.parse(consignment);
        dd = CommonUtil.reformatDate(dd);
        da = CommonUtil.reformatDate(da);
        console.log(req.body);
        let userInfo = security.getUserInfo(req);
        if (ValidationUtil.validateOrder({name,client,status,sender,receiver,dd, da, waybill_status, driver, auto, consignment})){
            let db = new Database();
            db.beginTransaction(
                db.query('INSERT INTO waybill(status, driver, auto, date_departure, date_arrival, user_id) VALUES (?,?,?,?,?,?)',
                    [1,driver,auto, dd,da,null]).then(data=>{
                    db.executeQuery('SELECT * FROM waybill ORDER BY id DESC LIMIT 1').then(data=>{
                        let wayId = data[0].id;
                        db.query('INSERT INTO orders(name, client, status, sender, receiver, date_departure, date_arrival, waybill, company) VALUES (?,?,?,?,?,?,?,?,?)',
                            [name,client,status,sender,receiver,dd,da,wayId,userInfo.companyId]).then(data=>{
                            db.executeQuery("SELECT orders.id as oId FROM orders ORDER BY id DESC LIMIT 1").then(orderData=>{
                                db.query('INSERT INTO consignment(name, order_id) VALUES (?,?)',[new Date().toLocaleDateString('ru'), orderData.oId]).then(()=>{
                                    __saveProducts(consignment);
                                    return resp.json({status: 'ok'})
                                })
                            })
                        });


                    });
                })
            );
            db.commit(()=>console.log('commit'));
        }else{
            resp.json({error: 'Check data'});
        }
    });

});


__saveProducts = (consignment) => {
    let db = new Database();
    try{
        db.executeQuery('SELECT id FROM consignment ORDER BY id DESC LIMIT 1').then(data=>{
            consignment.forEach(product=>{
                db.executeQuery('INSERT INTO product(name, status, description, product_consignment, cancellation_act, price, count, cancelled_count) VALUES (name, status, description, product_consignment, cancellation_act, price, count, cancelled_count)',
                    [product.name, product.status, product.description, data.id, null, product.price, product.count, 0]);
            });
        });
    }catch (e) {
        db.rollback(()=>console.log("rollback"));
        return "ok";
    }
};

module.exports = router;
