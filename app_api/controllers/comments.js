var mongoose = require('mongoose');
var Videos = mongoose.model('Video');
var User = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

var getAuthor = function(req, res, callback){
  if(req.payload && req.payload.email){
    User
    .findOne({email: req.payload.email})
    .exec(function(err, user){
      if(!user){
        sendJSONresponse(res, 404, {
          "message": "User not found"
        });
        return;
      }else if(err){
        console.log(err);
        sendJSONresponse(res, 404, err);
        return;
      }
      callback(req, res, user);
    });
  } else{
    sendJSONresponse(res, 404, {
      "message": "User not found"
    });
    return;
  }
};

/*
*Get all comments of a video.
*/
module.exports.commentList = function(req, res){
  console.log('Finding videos details: ' + req.params);
  if(req.params && req.params.videoid){
    Videos
    .findById(req.params.videoid)
    .exec(function(err, video){
      if(!video){
        sendJSONresponse(res, 404, {"message": "No video found."});
        return;
      }else if(err){
        sendJSONresponse(res, 404, err);
        return;
      }
      if(video.comments){
        sendJSONresponse(res, 200, video.comments);
      }else{
        sendJSONresponse(res, 404, {"message": "No comments found for this video."});
      }
    });
  }else{
    sendJSONresponse(res, 404, {
      "message" : "No video in request"
    });
  }
}

/*
*Add a comment to a video
*/
module.exports.addComment = function(req, res){
  getAuthor(req, res, function(req, res, user){
    if (req.params && req.params.videoid) {
      Videos
        .findById(req.params.videoid)
        .select('comments')
        .exec(
          function(err, video) {
            if (err) {
              sendJSONresponse(res, 400, err);
            } else {
              doAddComment(req, res, video, user);
            }
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "Not found, videoid required"
      });
    }
  });
};

/*
*
*/
module.exports.updateComment = function(req, res){
  if (!req.params.videid || !req.params.commentid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, videoid and commentid are both required"
    });
    return;
  }
  Videos
    .findById(req.params.videoid)
    .select('comments')
    .exec(
      function(err, video) {
        var thisComment;
        if (!video) {
          sendJSONresponse(res, 404, {
            "message": "videoid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (video.comments && video.comments.length > 0) {
          thisComment = video.comments.id(req.params.commentid);
          if (!thisComment) {
            sendJSONresponse(res, 404, {
              "message": "commentid not found"
            });
          } else {
            thisComment.user = req.body.user;
            thisComment.comment = req.body.comment;
            video.save(function(err, video) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 200, thisComment);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No comment to update"
          });
        }
      }
  );
};

/*
*deleteComment
*/
module.exports.deleteComment = function(req, res){
  if (!req.params.videoid || !req.params.commentid) {
    sendJSONresponse(res, 404, {
      "message": "Not found, videoid and commentid are both required"
    });
    return;
  }
  Videos
    .findById(req.params.videoid)
    .select('comments')
    .exec(
      function(err, video) {
        if (!video) {
          sendJSONresponse(res, 404, {
            "message": "videoid not found"
          });
          return;
        } else if (err) {
          sendJSONresponse(res, 400, err);
          return;
        }
        if (video.comments && video.comments.length > 0) {
          if (!video.comments.id(req.params.commentid)) {
            sendJSONresponse(res, 404, {
              "message": "commentid not found"
            });
          } else {
            video.comments.id(req.params.commentid).remove();
            video.save(function(err) {
              if (err) {
                sendJSONresponse(res, 404, err);
              } else {
                sendJSONresponse(res, 204, null);
              }
            });
          }
        } else {
          sendJSONresponse(res, 404, {
            "message": "No comment to delete"
          });
        }
      }
  );
}

var doAddComment = function(req, res, video, author) {
  if (!video) {
    sendJSONresponse(res, 404, "videoid not found");
  } else {
    video.comments.push({
      user: author,
      comment: req.body.comment
    });
    video.save(function(err, video) {
      var thisComment;
      console.log(video);
      if (err) {
        sendJSONresponse(res, 400, err);
      } else {
        thisComment = video.comments[video.comments.length - 1];
        sendJSONresponse(res, 201, thisComment);
      }
    });
  }
};