const mongoose = require('mongoose');

const likeSchema = new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }
});

const Likes = mongoose.model('likes', likeSchema);
module.exports = Likes;