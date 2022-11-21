const mongoose = require('mongoose');

let itemsSchema =mongoose.Schema({
    title:{
        type:String,
        required: true
    },
    date:{
        type:Date,
        required:true
    },
    body:{
        type:String,
        required:true
    }
})

let ITEMS = module.exports =mongoose.model('ITEMS', itemsSchema);