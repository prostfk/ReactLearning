const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');
const jwt = require("jsonwebtoken");

router.get('/', (req, res, next) => {
    res.render('auth', {action: '/auth', method: 'post'});
});

router.post('/', (req, resp) => {
    let username = req.body.username;
    let password = req.body.password;
    console.log(username,password);
    if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20) {

        new db.Database().query(`SELECT * FROM users WHERE username='${username}'`).then(user=>{
            if (user.length > 0){
                console.log(user[0].id, user[0].username, user[0].password);
                if (user[0].username === username){
                    bcrypt.compare(password, user[0].password, (err, res) => {
                        console.log(res);
                        if (res){
                            let opts = {expiresIn: 120};
                            let secret = 'SECRET';
                            let token = jwt.sign(username,secret,opts);
                            return res.status(200).json({
                                message: "success",
                                token,
                                userId: user[0].id,
                                userRole: user[0].role,
                                companyId: user[0].company_id
                            });
                        }else{
                            console.log("failed");
                            return resp.status(401).json({ message: "Auth Failed" })
                        }
                    });
                }
            }else {
                resp.send({error: 'invalid data'});
            }
        });
    }else{
        resp.json({error: 'validation'});
    }

});

router.get('/logout', (req,resp) => {
    req.session.destroy(err=>{
        console.log(err);
        resp.redirect('/');
    })
});


module.exports = router;
