const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const Database = require('../util/database');
const security = require('../util/security');

router.get('/users', (req, resp) => {
    security.checkRole(req, resp, "ROLE_OWNER",()=>{
        let details = jwt.decode(req.headers['authorization'], 'SECRET');
        new Database().query("SELECT * FROM users WHERE company_id=?", details.companyId).then(data=>{
            resp.json(data);
        });
    })
});

router.get('/addUser');

module.exports = router;
