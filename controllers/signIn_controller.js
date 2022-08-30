const otpMailer = require('../mailers/signin/send_otp');
const User = require('../models/users');



module.exports.signIn = function(req, res){
    if(req.isAuthenticated()){return res.redirect('/');}
    return res.render('signin', {layout : false});
};

module.exports.destroySession = async function(req, res){
    try {
        if(req.isAuthenticated()){req.logout();req.flash('error', 'logout successfully');return res.redirect('/user/signin');}
    } catch (err) {
        console.log('Error in destroying session : ', err);
        return res.redirect('back');
    }
}

let otp;


function generateOTP() {
          
    // Declare a digits variable 
    // which stores all digits
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < 6; i++ ) {
        OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
}


module.exports.sentOtp = async (req, res) => {
    try {

        let user = await User.findOne({email: req.body.email});
        if(!user){console.log("Here");req.flash('error', 'you are not a registered user');return res.redirect('/user/signup');}
        otp = generateOTP();
        otpMailer.sent_OTP(user, otp);
        console.log('OTP : ' + otp);
        req.flash('success','otp is sent to your email');
        console.log('error');
        return res.render('enter_otp', {layout : false,email:user.email});
        
    } catch (err) {
        console.log('Error in sentOtp funcn in controller : ' + err);
        return;
    }
}



module.exports.enterOTP = async (req, res) => {
    try {

        let user = await User.findOne({email:req.body.email});
        console.log(otp + " : " + req.body.otp);

        if(otp != req.body.otp){ return res.redirect('back');}
        
        else{
            return res.render('continue_page', {layout : false,user:user});
        }
        
    } catch (err) {
        console.log('Error in sentOtp funcn in controller : ' + err);
        return;
    }
}









module.exports.createSession = async function(req, res){
    try {
        console.log("req.user : ", req.user);
        // console.log('req.isAuthenticated() : ', req.isAuthenticated());
        let user = await User.findOne({email:req.body.email});
        
        console.log('above flash');
        req.flash('success', 'login successfully');
        return res.redirect('/');

    } catch (err) {
        req.flash('error', 'Error in signing in');
        console.log('Error in createSession : ', err);
        return res.redirect('back');
    }
};