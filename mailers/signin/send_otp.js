const nodeMailer = require('../../config/nodemailer');

exports.sent_OTP = async (user, otp) => {

    try {

        console.log('inside sent_otp funcn : ' + user);

    let htmlContent = nodeMailer.renderTemplate({otp: otp, user:user}, '/signin/sentOtp.ejs');
    nodeMailer.transporter.sendMail({
        from:'keshavjha2302@gmail.com',
        to:user.email,
        subject:'OTP for login to Befriends',
        html:htmlContent
    }, function(err, info) {
        if(err){console.log('Error in sending mail : ' + err); return;}
        console.log('Mail sent successfully : ' + info);
    })
        
    } catch (err) {
        console.log('Error in sending mail : ' + err);
        return;
    }
    
}