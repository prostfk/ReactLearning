const roles = require('../constants/roles');
const CommonUtil = require('../util/commonUtil');
const ValidationUtil = require('../util/validation');
const express = require('express');
const router = express.Router();
const Database = require('../util/database');
const security = require('../util/security');

router.get('/route/:id',(req,resp)=>{
   security.checkRole(req,resp,roles.MANAGER, ()=>{
       let userInfo = security.getUserInfo(req);
       let db = new Database();
       db.executeQuery()
   });
});