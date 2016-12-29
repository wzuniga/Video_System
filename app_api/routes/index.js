var express = require('express');
var router = express.Router();

var ctrlVideos = require('../controllers/videos');
var ctrlUsers = require('../controllers/users');
var ctrlComments = require('../controllers/comments');

var ctrlAuth = require('../controllers/authentication');
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
})

/*
* Hook Videos
*/

router.get('/videos', ctrlVideos.videoList);
router.get('/videos/:videoid', ctrlVideos.videoById);
router.post('/videos', ctrlVideos.addVideo);
router.put('/videos/:videoid', ctrlVideos.updateVideo);
router.delete('/videos/:videoid', ctrlVideos.deleteVideo);

/*
*Hook Comments
*/
router.get('/videos/:videoid/comments', auth, ctrlComments.commentList);
router.post('/videos/:videoid/comments', auth, ctrlComments.addComment);
router.put('/videos/:videoid/comments/:commentid', auth, ctrlComments.updateComment);
router.delete('videos/:videoid/comments/:commentid', auth, ctrlComments.deleteComment);


/*
* Hook users
*/

router.get('/users', ctrlUsers.userList);
router.get('/users/:userid', ctrlUsers.userById);
router.post('/users', ctrlUsers.addUser);

router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);

module.exports = router;
