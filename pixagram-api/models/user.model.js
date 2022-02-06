//USER ENTITIES RELATED MODELLING
const mongoose = require('mongoose');
const userSchema = new mongoose.Schema({
    fullName: {
        type: String
    },
    email: {
        type: String,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    image: {
        type: String,
        default: 'pp.png'
    },
    role: {
        type: Number,
        default: 2
    },
    active: {
        type : Boolean,
        default : true
    }
})
const UserModel = mongoose.model('User', userSchema)
module.exports = UserModel;