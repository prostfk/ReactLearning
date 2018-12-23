const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');

router.get('/', (req, res, next) => {
    res.render('auth', {action: '/registration', method: 'post'});
});

router.post('/', (req, resp) => {
    let {username, password, firstName, email, secondName, birthDate, companyName} = req.body;
    if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20) {
        bcrypt.hash(password, 10, (err, hash) => {
            console.log(username, password);
            new db.Database().query(`SELECT * FROM users WHERE username='${username}'`).then(userInBase => {
                new db.Database().query(`SELECT * FROM company WHERE name='${companyName}'`).then(companyInBase => {
                    console.log(userInBase, companyInBase);
                    if (userInBase.length === 0 && companyInBase.length === 0) {
                        new db.Database().query(`
                    INSERT INTO company(name) VALUES ('${companyName}');
                `).then(resp => {
                            new db.Database().query(
                                `SELECT * FROM company WHERE name='${companyName}'`
                            ).then(company => {
                                new db.Database().query(
                                    `INSERT INTO users(username, password, role, name, surname, email, birth_day, company_id) VALUES
                            ('${username}', '${hash}', 'ROLE_OWNER', '${firstName}', '${secondName}', '${email}', '${birthDate}', ${company[0].id})`
                                ).then(result => {
                                    resp.json({
                                        status: 'ok'
                                    })
                                })
                            })
                        });

                    } else {
                        resp.json({
                            error: 'company or user already exists'
                        })
                    }
                })
            });

        });
    }

});
module.exports = router;
