const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');

router.get('/', (req, res, next) => {
    res.render('auth', { action: '/registration', method: 'post' });
});

router.post('/', (req,resp)=>{
    let username = req.body.username;
    let password = req.body.password;
    if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20){
        bcrypt.hash(password, 10, (err, hash) =>  {
            console.log(username, password);
            let res = db.executeQuery(`SELECT * FROM users WHERE username='${username}'`);
            if (res===undefined){
                db.execute(
                    `INSERT INTO users(username, password, role) VALUES ('${username}', '${hash}', 'ROLE_USER')`
                );
                resp.redirect('/');
            }else{
                resp.redirect('/error')
            }
        });
    }

});
module.exports = router;
