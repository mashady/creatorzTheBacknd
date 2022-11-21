const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const cookieParser = require('cookie-parser');
const router = express.Router();


router.get('/', (req, res) => {
    let currentUser = req.cookies['username']; 
    res.send('hello again, we have a cookies '+currentUser)
});


module.exports = router;