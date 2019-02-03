const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/:role/orders', (req, resp) => {
    let role = req.params.role;
    if (role === 'admin' || role === 'dispatcher' || role === 'owner' || role === 'manager'){
        security.checkRole(req, resp, ['ROLE_DISPATCHER', 'ROLE_OWNER', 'ROLE_MANAGER'], () => {
            let db = new Database();
            let userDetails = security.getUserInfo(req);
            db.executeQuery(`SELECT * FROM orders WHERE company=${userDetails.companyId}`).then(data => {
                resp.json(data);
            })
        });
    }else{
        resp.sendStatus(404);
    }
});
router.get('/:role/stocks', (req,resp)=>{
    let role = req.params.role;
    if (role === 'admin' || role === 'dispatcher' || role === 'owner') {
        security.checkRole(req, resp, ['ROLE_DISPATCHER', 'ROLE_ADMIN', "ROLE_OWNER"], () => {
            let db = new Database();
            let userDetails = security.getUserInfo(req);
            db.executeQuery('SELECT * FROM stock WHERE companyId=?', userDetails.companyId).then(data => {
                resp.json(data);
            })
        })
    }else{
        resp.sendStatus(404);
    }
});
module.exports = router;