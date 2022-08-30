const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
    content:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'users'
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'posts'
    }
},{
    timeStamps:true
});

const Comment = mongoose.model('comments', commentSchema);
module.exports = Comment;