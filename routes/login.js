const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const { validateLogin } = require('../middleware/validate');

const { User } = require('../models/users');

const Router = express.Router();


Router.get('/', async (req, res) => {
    res.send('login')
});

Router.post('/', async (req, res) => {
    // we will validate the data which come to us
    const { error } = validateLogin(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    // then we will search for the user that come to us
    let user = await User.findOne({email: req.body.email});
    if(!user) return res.status(400).send('Invalid Email Or Password');

    // then we will validate the password
    let validPassword = await bcrypt.compare(req.body.password, user.password);
    if(!validPassword) return res.status(400).send('Invalid Password Or Email');

    // then every thing is okay ? we will generate the token and put in cookies
    const token = user.generateAuthToken();
    const maxAge = 3 * 24 * 60 * 60;
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000 }).cookie('username', user.username).send('login succefully '+user.username)
    
});

module.exports = Router;