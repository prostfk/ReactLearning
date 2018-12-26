const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const Database = require('../util/database');
const security = require('../util/security');
const ValidationUtil = require('../util/validation');

router.post('/addUser', (req, resp) => {

    security.checkRole(req, resp, "ROLE_OWNER", () => {
        let {username, email, role, password, birth_day, name, surname, passport} = req.body;
        if (ValidationUtil.validateUser({username, role, password, birth_day, name, surname, passport, email})) {
            let db = new Database();
            let userData = security.getUserInfo(req);
            db.executeQuery('SELECT * FROM users WHERE username=?',username).then(data=>{
                if (data.length === 0){
                    db.execute("INSERT INTO users(username, password,role,name,surname,email, birth_day, company_id) VALUES (?,?,?,?,?,?,?,?)",
                        [username,password,role,name,surname,email,birth_day,userData.companyId]);
                    resp.json({status: 'added'});
                }else{
                    resp.json({error: 'user with such username already exists'});
                }
            })
        }else{
            resp.json({error: 'check your data'});
        }
    })

});


module.exports = router;
