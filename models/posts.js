const mongoose = require('mongoose');
const multer = require('multer');
const path = require('path');
const AVATAR_PATH = path.join('/uploads/posts/avatars');

const postSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'users'
    }, 
    avatar:{
        type:String
    },
    comments:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'comments'
    }],
    likes:[{
        type: mongoose.Schema.Types.ObjectId,
        ref:'likes'
    }]
}, {
    timestamps:true
});


let storage = multer.diskStorage({
    destination: function(req, file, cb){
        cb(null, path.join(__dirname, '..', AVATAR_PATH));
    },
    filename: function(req, file , cb){
        cb(null, file.fieldname + '-' + Date.now());
    }
});

postSchema.statics.uploadedAvatar = multer({storage:storage}).single('avatar');
postSchema.statics.avatarPath = AVATAR_PATH;




let Post = mongoose.model('posts', postSchema);
module.exports = Post;