const mongoose = require('mongoose');
const path = require('path');
const multer = require('multer');
const AVATAR_PATH = path.join('/uploads/users/avatars');

const userSchema = new mongoose.Schema({
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    name:{
        type:String
    },
    age:{
        type:String
    },
    institute:{
        type:String
    },
    about:{
        type:String,
    },
    gender:{
        type:String
    },
    relationshipStatus:{
        type:String
    },
    avatar:{
        type:String
    },
    backAvatar:{
        type:String
    },
    allPosts :[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }]
}, {
    timestamps:true
});


let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});



userSchema.statics.uploadAvatar = multer({storage:storage}).single('avatar');
userSchema.statics.avatarPath = AVATAR_PATH;


const user = mongoose.model('users', userSchema);
module.exports = user;