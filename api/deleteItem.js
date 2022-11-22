const express = require('express');
const _ = require('lodash');
const Item = require('../models/items')
const router = express.Router();

router.get('/:id', (req, res)=> {
    let currentUser = req.cookies['username'];
    res.send('hello, we will add a new post '+currentUser);
});

router.post('/:id',async (req, res)=>{
    let currentUser = req.cookies['username'];
    if (currentUser) {
        let item = await Item.findOneAndDelete({_id:req.params.id});
        res.send(req.params.id+' deleted succefully');
    } else {
        res.send('Access Denied!');
    };
});


module.exports = router;
