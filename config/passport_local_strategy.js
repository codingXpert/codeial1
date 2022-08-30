const passport = require('passport');
const localStrategy = require('passport-local').Strategy;
const User = require('../models/users');

passport.use(new localStrategy({
    usernameField:'email'
}, 
    function(email, password, done){
        User.findOne({email:email}, function(err, user){
            if(err){console.log('Error in fetching user from localStrategy: ', err); return done(err);}
            if(!user || user.password != password){
                console.log('Invalid username or password!!!');
                return done(null, false);
            }
            return done(null, user);
        });
    }
));

passport.serializeUser(function(user, done){
    return done(null, user._id);
});

passport.deserializeUser(function(id, done){
    User.findById(id, function(err, user){
        if(err){console.log('Error in fetching user while deserializing: ', err); return done(err);}
        if(!user){return done(null, false);}
        return done(null, user);
    });
});

passport.checkAuthentication = function(req, res, next){
    if(req.isAuthenticated()){return next();}
    return res.redirect('/user/signin');
}

passport.setAuthenticatedUser = function(req, res, next){
    // console.log('req.isAuthenticated() : ', req.isAuthenticated());
    if(req.isAuthenticated()){
        res.locals.user = req.user;
    }
    next();
};