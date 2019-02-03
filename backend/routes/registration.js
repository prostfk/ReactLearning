const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const Database = require('../util/database');
const User = require("../model/User.model");
const Company = require("../model/Company.model");
const sequelize = require("../model/Connection");
router.get('/', (req, res, next) => {
    res.render('auth', {action: '/registration', method: 'post'});
});

// router.post('/', (req, resp) => {
//     const db = new Database();
//     let {username, password, firstName, email, secondName, birthDate, companyName} = req.body;
//     if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20) {
//         bcrypt.hash(password, 10, (err, hash) => {
//                 console.log(username, password);
//                 User.findOne({where: {username}}).then(userInBase => {
//                     Company.findOne({
//                         where: {name: companyName}
//                     }).then(companyInBase => {
//                         console.log(userInBase, companyInBase);
//                         if (!userInBase && !companyInBase) {
//                             Company.create({
//                                 name: companyName
//                             }).then(savedCompany => {
//                                 User.create({
//                                     username,
//                                     password,
//                                     role: 'ROLE_OWNER',
//                                     name: firstName,
//                                     surname: secondName,
//                                     email,
//                                     birth_day: birthDate,
//                                     companyId: savedCompany.id
//                                 }).then(result => {
//                                     resp.json({status: result});
//                                 })
//                             });
//                         }
//                     })
//                 }).catch(err => resp.json({error: err}))
//
//             }
//         );
//     }
// });

router.post('/', async (req, resp) => {
    let {username, password, firstName, email, secondName, birthDate, companyName} = req.body;
    console.log({username, password, firstName, email, secondName, birthDate, companyName});
    if (username.length >= 4 && username.length <= 25 && password.length >= 6 && password.length <= 20) {
        let transaction;
        try {
            transaction = await sequelize.transaction();
            let baseUser = await User.findOne({where: {username}, transaction}).then(baseUser => baseUser);
            console.log("base user", baseUser);
            if (!baseUser) {
                let hash = await bcrypt.hash(password, 10);
                console.log(hash);
                let company = await Company.findOne({where: {name: companyName}, transaction: transaction}).then(baseCompany => baseCompany);
                console.log("base company", company);
                if (!company){
                    let newCompany = await Company.create({name: companyName}, {transaction: transaction});
                    let newUser = await User.create({
                        username: username,
                        password: hash,
                        role: 'ROLE_OWNER',
                        name: firstName,
                        surname: secondName,
                        email: email,
                        birth_day: birthDate,
                        company_id: newCompany.id}, {transaction: transaction});
                    if (newUser && newCompany){
                        let commit = await transaction.commit();
                        if (commit){
                            resp.json({user: newUser, company: newCompany});
                        }else{
                            resp.json({error: 'commit undefined'})
                        }
                    }else {
                        resp.json({error: 'new user and company ??'})
                    }
                }else {
                    resp.json({error: "company is not undefined"})
                }
            }else{
                resp.json({error: "base user exists"});
            }
        }catch (e) {
            console.log(e);
            transaction.rollback();
            resp.json({error: 'ROLLBACK'})
        }
    }else{
        resp.json({error: 'Validation not passed'})
    }
});

module.exports = router;
