const express = require('express');
const _ = require('lodash');
const Post = require('../models/posts')
const User = require('../models/users')
const router = express.Router();

router.get('/:id', (req, res)=> {
    let currentUser = req.cookies['username'];
    res.send('hello, we will add a new post '+currentUser);
});

router.post('/:id', (req, res)=>{
    let currentUser = req.cookies['username'];
    if (currentUser) {
        let filter = {_id: req.params.id};
        let post = _.pick(req.body, ['title', 'body']);

        Post.update(filter, post, (err)=>{
            if(err){
                console.log(err);
                return;
            } else {
                res.redirect('/posts');
            }
        });

    } else {
        res.send('Access Denied!')
    };
});

module.exports = router;
