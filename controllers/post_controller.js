const Post = require('../models/posts');
const User = require('../models/users');
const fs = require('fs');
const path = require('path');

module.exports.create = async function(req, res){
    try {

        Post.uploadedAvatar(req, res, async function(){
            console.log('Here');

            let post = await Post.create({
                content: req.body.content,
                user: req.user._id
            });

            if(req.file){

                if(post.avatar && fs.existsSync(post.avatar)){
                    fs.unlinkSync(post.avatar);
                }

                post.avatar = Post.avatarPath + "/" + req.file.filename;
                post.save();
            }

            let user = await User.findById(req.user._id);
            (user.allPosts).push(post._id);
            user.save();

            console.log('post : ' + post);
            

        });
        req.flash('success', 'Post published');
        return res.redirect('back');
        
    } catch (err) {
        console.log('Error in creating the Post : ', err);
        return;
    }
}


module.exports.destroy = async function(req, res){
    try {

        let post = await Post.findById(req.params.id);
        post.remove();

        if(fs.existsSync(path.join(__dirname, '..', post.avatar))){
            fs.unlinkSync(path.join(__dirname, '..', post.avatar));
            console.log('File deleted!!');
        }

        console.log('path : ' + (path.join(__dirname, '..', post.avatar)));

        let user = await User.findById(req.user._id);
        let ind = (user.allPosts).findIndex(function(each_id){ return each_id == req.user._id;});
        (user.allPosts).splice(ind, 1);
        user.save();
        console.log('Post deleted Successfully');
        req.flash('error', 'Post Deleted');
        return res.redirect('back');
        
    } catch (err) {
        console.log('Error in deleting a post : ' + err);
        return;
    }
}