const Likes = require('../models/likes');
const Post = require('../models/posts');

module.exports.toggleLike = async (req, res) => {
    try {

        let existingLike = await Likes.findOne({user:req.user._id , post:req.params.id});

        if(existingLike){
            let post = await Post.findByIdAndUpdate(req.params.id, {$pull:{likes:existingLike._id}});
            existingLike.remove();
        }else{
            let like = await Likes.create({
                post:req.params.id,
                user:req.user._id
            });
            let post = await Post.findById(req.params.id);
            post.likes.push(like._id);
            post.save();
        }

        return res.redirect('back');
        
    } catch (err) {
        console.log('Error in toggle Like : ' + err);
        return;
    }
}