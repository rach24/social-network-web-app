/* Only one file to contain all routes.
Hence getting rid of routed folder */

var express = require('express');
var router = express.Router();

// Require controller modules
var login = require('./controllers/signup_login');
var Profile = require('./controllers/user_prof');
var post= require('./controllers/post');


/* registration routes */
router.get('/',login.index);
router.post('/home',login.sign_in);
router.post('/signup',login.sign_up);
router.get('/logout',login.logout);

// /** Landing page routes */
router.get('/home',Profile.homeview);
// router.get('/profile',Profile.profileEditView);
router.post('/profile',Profile.profileUpdate);

// /* Post routes*/
router.get('/home/posts',post.renderPostPage);
router.post('/create',post.submitPost);
router.get('/viewposts',post.ViewPost);
router.get('/viewposts/detail/:name',post.ViewPostDetail);
router.post('/viewposts/detail/:name',post.DeletePost);


module.exports = router;
