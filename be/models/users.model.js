const mongoose = require('mongoose');

const UserSchema =  mongoose.Schema({
    fullName: String,
    email: String,
    password: String,
    phoneNumber: Number,
    address: String, 
    gender :String
})

module.exports = mongoose.model('User', UserSchema)