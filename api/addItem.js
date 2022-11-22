const express = require('express');
const _ = require('lodash');
const Item = require('../models/items')
const router = express.Router();

router.get('/', (req, res)=> {
    let currentUser = req.cookies['username'];
    res.send('hello, we will add a new post '+currentUser);
});

router.post('/',async (req, res)=>{
    let currentUser = req.cookies['username'];
    if (currentUser) {
        let item = new Item(_.pick(req.body, ['title', 'body']))
        item = await item.save();
        res.send(item)
    } else {
        res.send('Access Denied!')
    };
});

module.exports = router;
