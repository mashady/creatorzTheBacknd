const jwt = require('jsonwebtoken');
const mongoose = require ('mongoose');

const userSchema = new mongoose.Schema({
    username:{
        type:String,
        required: true,
        minlength:5,
        maxlength:55
    },
    email:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:5,
        maxlength:1024
    },
});

// our tken schema
userSchema.methods.generateAuthToken = function() {
    const token = jwt.sign({_id: this._id, email: this.email }, 'jwtPrivateKey');
    return token;
};



const User = mongoose.model('User', userSchema);



exports.User = User;