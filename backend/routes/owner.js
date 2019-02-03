const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const Database = require('../util/database');
const security = require('../util/security');
const User = require('../model/User.model');

router.get('/users', (req,resp)=>{
    security.checkRole(req,resp,'ROLE_OWNER', ()=>{
        // let db = new Database();
        let userData = security.getUserInfo(req);
        console.log("model select");
        User.findAll(
            {where: {company_id: userData.companyId},
                attributes: {exclude: ['password']}}
        ).then(data=>{
            resp.json(data);
        })
    })
});

router.get('/clients', (req, resp) => {
    security.checkRole(req, resp, "ROLE_OWNER", () => {
        let db = new Database();
        let userData = security.getUserInfo(req);
        db.executeQuery('SELECT * FROM client WHERE owner=?', userData.companyId).then(data=>{
            resp.json(data);
        })
    });
});

router.post('/addClient', (req, resp) => {
    security.checkRole(req, resp, 'ROLE_OWNER', () => {
        let db = new Database();
        let {name, type} = req.body;
        let userInfo = security.getUserInfo(req);
        if (ValidationUtil.validateClient({name,type})){
            db.query('INSERT INTO client(name, type, owner) VALUES (?,?,?)', [name, type, userInfo.companyId]).then(data => {
                resp.json({status: 'added'});
            })
        }else {
            resp.json({error: 'check data'});
        }
    });
});

// router.get('/orders', (req,resp)=>{
//     security.checkRole(req,resp, 'ROLE_OWNER', () => {
//         let db = new Database();
//         let userInfo = security.getUserInfo(req);
//         db.executeQuery('SELECT * FROM orders WHERE company=?', userInfo.companyId).then(data=>{
//             resp.json(data);
//         })
//     })
// });

module.exports = router;
