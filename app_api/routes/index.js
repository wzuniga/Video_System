var express = require('express');
var router = express.Router();

var ctrlVideos = require('../controllers/videos');
var ctrlUsers = require('../controllers/users');

/*
* Hook Videos
*/

router.get('/videos', ctrlVideos.videoList);
router.get('/videos/:videoid', ctrlVideos.videoById);
router.post('/videos', ctrlVideos.addVideo);

/*
* Hook users
*/

router.get('/users', ctrlUsers.userList);
router.get('/users/:userid', ctrlUsers.userById);
router.post('users', ctrlUsers.addUser);

module.exports = router;