const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const verifyToken = require('../util/token');
const roleFilter = require('../util/token');


// router.get('/users', jwt({secret: 'SECRET'}), (req, resp) => {
//     console.log(req.user);
// });

router.get('/users', verifyToken, (req, resp, next) => {
    // roleFilter(req,resp,next, 'ROLE_OWNER');
    resp.json([
        {
            id: 1,
            firstName: 'Roman',
            secondName: 'Medvedev',
            role: 'ROLE_ADMIN'
        },
        {
            id: 2,
            firstName: 'Roman',
            secondName: 'Medvedev',
            role: 'ROLE_ADMIN'
        },
        {
            id: 3,
            firstName: 'Roman',
            secondName: 'Medvedev',
            role: 'ROLE_ADMIN'
        },
    ])

});

module.exports = router;
