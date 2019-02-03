// import Database from "../util/database";
const Database = require('../util/database');
const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');
const jwt = require("jsonwebtoken");
const User = require("../model/User.model");

router.post('/', (req, resp) => {
    let username = req.body.username;
    let password = req.body.password;
    const db = new Database();
    // console.log(username, password);
    if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20) {
        User.findOne({
            where: {username: username}
        }).then(user => {
            console.log(user);
            if (user) {
                console.log(user.id, user.username, user.password);
                bcrypt.compare(password, user.password, (err, res) => {
                    console.log(res);
                    if (res) {
                        let secret = 'SECRET';
                        jwt.sign({
                            id: user.id,
                            username: user.username,
                            role: user.role,
                            companyId: user.company_id
                        }, secret, (err, token) => {
                            return resp.status(200).json({
                                message: "success",
                                token,
                                userId: user.id,
                                userRole: user.role,
                                companyId: user.company_id
                            });
                        });
                    } else {
                        console.log("failed");
                        return resp.status(401).json({message: "Auth Failed"})
                    }
                })
            } else {
                resp.json({error: 'no such user'});
            }
        });
    } else {
        resp.json({error: 'validation'});
    }

});

router.get('/logout', (req, resp) => {
    req.session.destroy(err => {
        console.log(err);
        resp.redirect('/');
    })
});


module.exports = router;
