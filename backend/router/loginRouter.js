const express = require('express'); 
const login = require('../controller/login'); // Confirm '../controller/login' exists


const router = require('express').Router();


router.post('/login',login);
module.exports = router;