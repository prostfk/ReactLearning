const express = require('express');
const router = express.Router();
const db = require('../util/database');


router.get('/', (req, res, next) => {
    new db.Database().query("SELECT * FROM films").then(data => {
        res.render('index', {films: data});
    });
});

router.get('/search', (req,resp)=>{
    let query = require('url').parse(req.url,true).query;
    let type = query.type;
    let str = query.string;
    new db.Database().query(`SELECT * FROM films WHERE ${type} LIKE '%${str}%'`).then(data => {
        resp.render('index', {films: data});
    });
});

router.get('/film/:id', function(req, res) {
    new db.Database().query(`SELECT * FROM films WHERE id=${req.params.id}`).then(data => {
        res.render('index', {films: data});
    });

});

module.exports = router;
