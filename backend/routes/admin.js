const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');
const jwt = require('jwt-simple');
const ValidationUtil = require('../util/validation');


router.get('/autos', (req, resp)=>{
    security.checkRole(req,resp,"ROLE_ADMIN", ()=>{
        let db = new Database();
        let userData = security.getUserInfo(req);
        db.executeQuery('SELECT * FROM autos WHERE companyId=?', userData.companyId).then(data=>{
            resp.json(data);
        })

    });
});

router.post('/addAuto', (req,resp)=>{
    security.checkRole(req,resp,'ROLE_ADMIN', ()=>{
        let db = new Database();
        let userData = security.getUserInfo(req);
        let {name, fuel, number, type} = req.body;
        if (ValidationUtil.validateAuto({name,fuel,number,type})){
            db.execute('INSERT INTO autos(name, carNumber, type, fuelConsumption, companyId) VALUES (?,?,?,?,?)',
                [name,number, type,fuel, userData.companyId]);
            resp.json({status: 'added'});
        }else{
            resp.json({error: 'check data'});
        }
    });
});

module.exports = router;
