const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
    },
    password:{
        type:String ,
    },
    token: {
        type: String,
    },
}, { timestamps: true })

const User = mongoose.model('User', userSchema);
module.exports = User;