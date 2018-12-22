const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');

router.get('/', (req, res, next) => {
    res.render('auth', {action: '/auth', method: 'post'});
});

router.post('/', (req, resp) => {
    let username = req.body.username;
    let password = req.body.password;
    if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20) {

        new db.Database().query(`SELECT * FROM users WHERE username='${username}'`).then(user=>{
            if (user.length > 0){
                console.log(user[0].id, user[0].username, user[0].password);
                if (user[0].username === username){
                    bcrypt.compare(password, user[0].password, (err, res) => {
                        console.log(res);
                        if (res){
                            console.log("success");
                            req.session.id = user[0].id;
                            req.session.user = user[0];
                            resp.cookie('username',user[0].username);
                            resp.redirect("/");


                        }else{
                            console.log("failed");
                            resp.redirect("/auth?error=password");
                        }
                    });
                }
            }else {
                resp.redirect("/error");
            }
        });
    }else{
        resp.redirect('/error');
    }

});

router.get('/logout', (req,resp) => {
    req.session.destroy(err=>{
        console.log(err);
        resp.redirect('/');
    })
});


module.exports = router;
