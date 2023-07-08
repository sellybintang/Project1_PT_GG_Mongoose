const mongoose = require ('mongoose');

const usersSchema = new mongoose.Schema({
    firstName: {
        type:String,
        required:[true,"tolong masukkan nama depan"]
    },
    lastName: {
        type:String,
        required:[true,"tolong masukkan nama akhir"]
    },
    email: {
        type:String,
        required:true,
        lowercase: true,
    },
    password: {
        type:String,
        required:true,
        min :8, 
    },
    username: {
        type:String,
        required:true,
        lowercase: true,
    },
    phoneNumber: {
        type:Number,
        required:true,
    },
    role: {
        type:String,
        required:true,
    },
    createdAt: {
        type: Date,
        immutable:true,
        default:()=> Date.now()
    },
    updateAt: {
        type: Date,
        immutable:true,
        default:()=> Date.now(),
    },
})

module.exports = mongoose.model("Users", usersSchema);