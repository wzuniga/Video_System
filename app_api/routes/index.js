var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlVideos = require('../controllers/videos');
var ctrlUsers = require('../controllers/users');
var ctrlComments = require('../controllers/comments');
var ctrlAuth = require('../controllers/authentication');

/*
* Hook Videos
*/

router.get('/videos', ctrlVideos.videoList);
router.get('/videos/:videoid', ctrlVideos.videoById);
router.post('/videos', auth, ctrlVideos.addVideo);
router.put('/videos/:videoid', auth,ctrlVideos.updateVideo);
router.delete('/videos/:videoid', auth, ctrlVideos.deleteVideo);

/*
*Hook Comments
*/
router.get('/videos/:videoid/comments', ctrlComments.commentList);
router.post('/videos/:videoid/comments', auth, ctrlComments.addComment);
router.put('/videos/:videoid/comments/:commentid', auth, ctrlComments.updateComment);
router.delete('videos/:videoid/comments/:commentid', auth, ctrlComments.deleteComment);

router.get('/users', ctrlUsers.userList);
router.get('/users/:userid', ctrlUsers.userById);
router.post('/users', ctrlUsers.addUser);
/*
* auth
*/
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
