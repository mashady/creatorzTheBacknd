const express = require('express');
const mongoose = require('mongoose');
const { User } = require('../models/users');
const { validateRegister } = require('../middleware/validate');
const bcrypt = require('bcrypt');
const Joi = require('@hapi/joi');
const _ = require('lodash');
const Router = express.Router();

Router.get('/', async (req, res) => {
    res.send('register')
});

Router.post('/', async (req, res) => {
    // here we validate the data which come from the user
    const { error } = validateRegister(req.body);
    if (error) return res.status(400).send(error.details[0].message);
    
    // then we search if the data which the user entered in our db
    let user = await User.findOne({email: req.body.email});
    if(user) return res.status(400).send('User Already Registered');

    // then we add our new user to the db
    user = new User(_.pick(req.body, ['username', 'email', 'password']));

    // then we bycrypt our password
    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    await user.save();
    
    // then we generate out jwt token
    const token = user.generateAuthToken(user._id);
    const maxAge = 3 * 24 * 60 * 60;
    res.cookie('jwt', token, {httpOnly: true, maxAge: maxAge * 1000}).cookie('username', user.username).send('Mission Complte ' + user.username) 
    
});

module.exports = Router;