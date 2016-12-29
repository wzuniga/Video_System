var express = require('express');
var router = express.Router();
var jwt = require('express-jwt');
var auth = jwt({
  secret: process.env.JWT_SECRET,
  userProperty: 'payload'
});

var ctrlVideos = require('../controllers/videos');
var ctrlComments = require('../controllers/comments');
var ctrlAuth = require('../controllers/authentication');

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
router.get('/videos/:videoid/comments', ctrlComments.commentList);
router.post('/videos/:videoid/comments', ctrlComments.addComment);
router.put('/videos/:videoid/comments/:commentid', ctrlComments.updateComment);
router.delete('videos/:videoid/comments/:commentid', ctrlComments.deleteComment);

/*
* auth
*/
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


module.exports = router;
