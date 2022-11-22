const express = require('express');
const _ = require('lodash');
const Post = require('../models/posts')
const router = express.Router();

router.get('/', (req, res)=> {
    let currentUser = req.cookies['username'];
    res.send('hello, we will add a new post '+currentUser);
});

router.post('/',async (req, res)=>{
    let currentUser = req.cookies['username'];
    if (currentUser) {
        let post = new Post(_.pick(req.body, ['title', 'body']))
        post = await post.save();
        res.send(post)
    } else {
        res.send('Access Denied!')
    };
});

module.exports = router;
