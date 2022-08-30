const crypto = require('crypto');
const passport = require('passport');
const googleStrategy = require('passport-google-oauth2').Strategy;
const User = require('../models/users');

passport.use(new googleStrategy({
    clientID:"573939935057-jqbovpf7v5fh43ipshq4n1425ucjs346.apps.googleusercontent.com",
    clientSecret:"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",
    callbackURL:"http://localhost:8000/user/auth/google/callback",
    passReqToCallback:true
}, function(req, accessToken, refreshToken, profile, done){
    console.log('Here!!!');
    User.findOne({email:profile.emails[0].value}, function(err, user){
        if(err){console.log('Error in finding User through google Strategy', err); return done(err);}
        if(user){req.flash('success', 'login successfully');return done(null, user);}
        else{
            User.create({
                name:profile.displayName,
                email:profile.emails[0].value,
                password:crypto.randomBytes(20).toString('hex')
            }, function(err, user){
                if(err){console.log('Error in creating User through google Strategy', err); return done(err);}
                req.flash('success', 'login successfully');
                return done(null, user);
            });
        }
    });
}));

module.exports = passport;