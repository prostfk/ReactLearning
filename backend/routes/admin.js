const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');
const fs = require('fs-extra');

const hasAccess = (req) => {
    if (req.session.user !== undefined){
        return req.session.user.role === 'ROLE_ADMIN';
    }else{
        return false;
    }
};

router.get('/', (req, res, next) => {
    if (req.session.user !== undefined){
        if (req.session.user.role === 'ROLE_ADMIN'){
            new db.Database().query("SELECT * FROM users").then(users=>{
                res.render('admin', {users: users});
            })
        }else{
            res.redirect('/auth');
        }
    }else{
        res.redirect('/auth');
    }
});
router.get('/addFilm', (req,resp)=>{
     if (hasAccess(req)){
         resp.render('adminAddFilm');
     }else{
         resp.redirect('/auth');
     }
});

router.post('/addFilm', (req,resp)=> {
    if (hasAccess(req)){
        let title = req.body.title;
        let description = req.body.description;
        let genre = req.body.genre;
        let body = '';
        let filePath = __dirname + '/public/images.txt';
        req.on('data', (data) => {
            body += data;
        });

        req.on('end', function (){
            fs.appendFile(filePath, body, function() {
                respond.end();
            });
        });
        if (title!== '' && description !== '' && genre !== ''){
            let img = req.files.image;
            img.mv('./public/images/' + img.name, (err) => {
                if (err) {
                    console.log(err);
                }else{
                    console.log("saved");
                    new db.Database().query(`INSERT INTO films(title, description, genre, pathToFile) VALUES('${title}', '${description}', '${genre}', '${'/images/' + img.name}')`);
                }
            });
            resp.redirect('/admin');
        }else{
            resp.redirect('/admin/addFilm?error=CheckData')
        }
    }else{
        resp.redirect('/auth');
    }
});

module.exports = router;
