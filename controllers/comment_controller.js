let Comment = require('../models/comments');
const Post = require('../models/posts');

module.exports.renderCommentPage = async (req, res) => {
    try {

        if(req.isAuthenticated()){

            let post = await Post.findById(req.params.id).populate('user').populate({
                path:'comments',
                populate:({
                    path:'user'
                })
            });

            return res.render('comment', {
                post:post,
                currUser:req.user
            });


        }else{
            req.flash('error', 'login to continue');
            return res.redirect('/user/signin');
        }
        
    } catch (err) {
        console.log('Error in rendering the Comment Page : ' + err);
        return;
    }
}


module.exports.createComment = async (req, res) => {
    try {

        if(req.isAuthenticated()){

            let comment = await Comment.create({
                content:req.body.content,
                user:req.user._id,
                post:req.body.post
            });

            let post = await Post.findById(req.body.post);
            post.comments.push(comment._id);
            post.save();

            console.log('New comment : ' + JSON.stringify(comment));
            req.flash('success', 'comments published');
            return res.redirect('back');
        }else{
            req.flash('error', 'login to continue');
            return res.redirect('/user/signin');
        }
        
    } catch (err) {
        req.flash('error', 'Error while publishing the comment');
        console.log('Error while creating the comment : ' + err);
        return;
    }
}


module.exports.deleteComment = async (req, res) => {
    try {

        if(req.isAuthenticated()){

            let comment = await Comment.findById(req.params.id);
            let post = await Post.findByIdAndUpdate(comment.post, {$pull:{comments:req.params.id}});

            comment.remove();
            console.log('Comment deleted');
            req.flash('error', 'comments deleted successfully');
            return res.redirect('back');

        }else{return res.redirect('/user/signin');}
        
    } catch (err) {
        console.log('Error in deleting the comment : ' + err);
        return;
    }
}