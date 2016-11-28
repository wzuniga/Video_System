var express = require('express');
var router = express.Router();

var ctrlVideos = require('../controllers/videos');
var ctrlUsers = require('../controllers/users');
var ctrlComments = require('../controllers/comments');

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
* Hook users
*/

router.get('/users', ctrlUsers.userList);
router.get('/users/:userid', ctrlUsers.userById);
router.post('/users', ctrlUsers.addUser);

module.exports = router;
