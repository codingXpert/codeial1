const User = require('../models/users');
const path = require('path');
const fs = require('fs');

module.exports.profile = async function(req, res){
    // console.log('Here : ' + req.params.id);

    try {
        if(req.isAuthenticated()){
            let isAdmin = false;

            let currUser = await User.findById(req.params.id)
                                .populate('allPosts')
                                .populate({
                                    path:'allPosts',
                                    populate:{
                                        path:'user'
                                    }
                                });
            
            if((currUser._id).equals(req.user._id)){ isAdmin = true;}

            console.log(currUser._id + " :  " +  req.user._id);

            console.log('isAdmin : ' + isAdmin);

            return res.render('profile',{
                currUser:currUser,
                allPosts:currUser.allPosts,
                isAdmin:isAdmin
            });
        }
        
        return res.redirect('/user/signin');
        
    } catch (err) {
        console.log('Error : ' + err);
    }

    
}


module.exports.updateProfile = async function(req, res){
    try {

        if(req.isAuthenticated()){

            User.uploadAvatar(req, res, async function(){
                
                let user = await User.findById(req.user._id);
                user.name = req.body.name;
                user.email = req.body.email;
                user.about = req.body.about;
                user.gender = req.body.gender;
                user.institute = req.body.institute;

                console.log('req.file : ' + req.file);
                // console.log('Avatar_path : ' + User.avatarPath);

                if(req.file){
                    if(user.avatar && fs.existsSync(user.avatar)){
                        fs.unlinkSync(user.avatar);
                    }
                    user.avatar = User.avatarPath + '/' + req.file.filename;
                }

                user.save();
                return res.redirect('back');
            });

            
        }else {
            return res.resirect('/user/signin');
        }
        
    } catch (err) {
        console.log('Error in updateProfile : ' + err);
        return;
    }
}


module.exports.updateCoverPic = async function(req, res){
    try {
        console.log('Hello');

        if(req.isAuthenticated()){

            let user = await User.findById(req.user._id);
            console.log('req.query.image : ' + req.query.image);
            user.backAvatar = req.query.image;
            user.save();
            return res.redirect('back');
        }else{
            return res.redirect('/user/signin');
        }
        
    } catch (err) {
        console.log('Error in updating cover picture : ' + err);
        return;
    }
}