const express = require('express');
const router = express.Router();
const jwt = require('jwt-simple');
const Database = require('../util/database');
const security = require('../util/security');



router.get('/addUser');

module.exports = router;
