const mongoose = require('mongoose');

let postsSchema =mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    body:{
        type:String,
        required:true
    }
})

let POSTS = module.exports =mongoose.model('POSTS', postsSchema);