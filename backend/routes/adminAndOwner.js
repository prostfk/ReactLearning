const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const Database = require('../util/database');
const security = require('../util/security');
const ValidationUtil = require('../util/validation');
const jwt = require('jwt-simple');

router.get('/users', (req, resp) => {
    security.checkRole(req, resp, ["ROLE_OWNER", "ROLE_ADMIN"],()=>{
        let details = jwt.decode(req.headers['authorization'], 'SECRET');
        new Database().query("SELECT * FROM users WHERE company_id=?", details.companyId).then(data=>{
            resp.json(data);
        });
    })
});

router.post('/addUser', (req, resp) => {

    security.checkRole(req, resp, ["ROLE_OWNER", "ROLE_ADMIN"], () => {
        let {username, email, role, password, birth_day, name, surname, passport} = req.body;
        if (ValidationUtil.validateUser({username, role, password, birth_day, name, surname, passport, email})) {
            let db = new Database();
            let userData = security.getUserInfo(req);
            db.executeQuery('SELECT * FROM users WHERE username=?',username).then(data=>{
                if (data.length === 0){
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) resp.json({error: err.toString()});
                        if (role!== 'ROLE_DRIVER'){
                            db.execute("INSERT INTO users(username, password,role,name,surname,email, birth_day, company_id) VALUES (?,?,?,?,?,?,?,?)",
                                [username,hash,role,name,surname,email,birth_day,userData.companyId]);
                        }else{
                            db.execute("INSERT INTO users(username, password,role,name,surname,email, birth_day, company_id, passport) VALUES (?,?,?,?,?,?,?,?)",
                                [username,hash,role,name,surname,email,birth_day,userData.companyId,passport]);
                        }
                        resp.json({status: 'added'});
                    });
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
