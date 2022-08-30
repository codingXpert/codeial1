const express = require('express');
const router = express.Router();
const homeController = require('../controllers/home_controller');
const signupController = require('../controllers/signUp_controller');
const signinController = require('../controllers/signIn_controller');
const postController = require('../controllers/post_controller');
const commentController = require('../controllers/comment_controller');
const likesController = require('../controllers/likes_controller');
const passport = require('passport');

router.get('/signup', signupController.signUp);

router.get('/signin', signinController.signIn);

router.get('/signout', signinController.destroySession);

router.post('/create', signupController.create);

router.post('/create-post', passport.checkAuthentication ,postController.create);

router.get('/delete-post/:id', postController.destroy);

router.get('/comment/:id', commentController.renderCommentPage);

router.post('/create-comment', commentController.createComment);

router.get('/delete-comment/:id', commentController.deleteComment);

router.get('/likes/:id', likesController.toggleLike);

router.post('/sent-otp', signinController.sentOtp);

router.post('/enter-otp', signinController.enterOTP);

router.post('/create-session', passport.authenticate('local' , {failureRedirect:'/user/signin'}), signinController.createSession);


router.get('/auth/google', passport.authenticate('google', {scope:['profile', 'email']}));

console.log('Inside GS');
router.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect:'/user/signin',
    successRedirect:'/'
}));


module.exports = router;