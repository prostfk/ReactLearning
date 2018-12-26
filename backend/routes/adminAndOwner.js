const express = require('express');
const router = express.Router();
const bodyParse = require('body-parser');
const bcrypt = require('bcrypt');
const db = require('../util/database');
const fs = require('fs-extra');
const jwt = require('jsonwebtoken');
const verifyToken = require('../util/token');
const roleFilter = require('../util/token');
const getDetails = require('../util/token');

router.post('/addUser', verifyToken, (req, resp, next) => {

    let details = getDetails(req, resp, next);
    console.log(details);
    resp.json({details, status: 200})

});


module.exports = router;
