const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const Joi = require('joi');
const cookieParser = require('cookie-parser');
const router = express.Router();

router.get('/:id', (req, res) => {
    let currentUser = req.cookies['username']; 
    res.send('hello from post page, your post id is '+req.params.id)
});


module.exports = router;