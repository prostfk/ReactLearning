const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const Database = require('../util/database');
const security = require('../util/security');
const ValidationUtil = require('../util/validation');
const jwt = require('jwt-simple');

router.get('/users', (req, resp) => {
    security.checkRole(req, resp, ["ROLE_OWNER", "ROLE_ADMIN"], () => {
        let details = jwt.decode(req.headers['authorization'], 'SECRET');
        new Database().query("SELECT * FROM users WHERE company_id=?", details.companyId).then(data => {
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
            db.executeQuery('SELECT * FROM users WHERE username=?', username).then(data => {
                if (data.length === 0) {
                    bcrypt.hash(password, 10, (err, hash) => {
                        if (err) resp.json({error: err.toString()});
                        if (role !== 'ROLE_DRIVER') {
                            db.execute("INSERT INTO users(username, password,role,name,surname,email, birth_day, company_id) VALUES (?,?,?,?,?,?,?,?)",
                                [username, hash, role, name, surname, email, birth_day, userData.companyId]);
                        } else {
                            db.execute("INSERT INTO users(username, password,role,name,surname,email, birth_day, company_id, passport) VALUES (?,?,?,?,?,?,?,?)",
                                [username, hash, role, name, surname, email, birth_day, userData.companyId, passport]);
                        }
                        resp.json({status: 'added'});
                    });
                } else {
                    resp.json({error: 'user with such username already exists'});
                }
            })
        } else {
            resp.json({error: 'check your data'});
        }
    })

});

router.post('/editUser', (req, resp) => {
    security.checkRole(req, resp, ['ROLE_ADMIN', 'ROLE_OWNER'], () => {
        let password = 'zxccxz';
        let {username, email, role, birth_day, name, surname, passport, id} = req.body;
        if (ValidationUtil.validateUser({username, email, role, birth_day, name, surname, passport, password})) {
            let db = new Database();
            db.executeQuery('SELECT * FROM users WHERE username=?', username).then(data => {
                if (data.length > 0) {
                    if (data[0].id === Number(id)) {
                        if (role === 'ROLE_DRIVER') {
                            db.execute('UPDATE users SET username=?, email=?, role=?, birth_day=?, name=?, surname=?, passport=? WHERE id=?',
                                [username, email, role, birth_day, name, surname, passport, id]);
                            resp.json({status: 'ok'});
                        } else {
                            db.execute('UPDATE users SET username=?, email=?, role=?, birth_day=?, name=?, surname=? WHERE id=?',
                                [username, email, role, birth_day, name, surname, id]);
                            resp.json({status: 'ok'});
                        }
                    } else {
                        console.log(data[0].id, id);
                        resp.json({error: 'user with such username already exists'})
                    }
                } else {
                    if (role === 'ROLE_DRIVER') {
                        db.execute('UPDATE users SET username=?, email=?, role=?, birth_day=?, name=?, surname=?, passport=? WHERE id=?',
                            [username, email, role, birth_day, name, surname, passport, id]);
                        resp.json({status: 'ok'});
                    } else {
                        db.execute('UPDATE users SET username=?, email=?, role=?, birth_day=?, name=?, surname=? WHERE id=?',
                            [username, email, role, birth_day, name, surname, id]);
                        resp.json({status: 'ok'});
                    }
                }
            })
        } else {
            resp.json({status: 'check data'});
        }

    })
});

module.exports = router;
