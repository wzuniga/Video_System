var mongoose = require('mongoose');
var Vid = mongoose.model('Video');
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
*Get All videos
*/
module.exports.videoList = function (req, res) {
  Vid
    .find()
    .exec(function(err, videos){
      if(!videos){
        sendJSONresponse(res, 404, {"message": "No videos found."});
        return;
      }else if(err){
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, videos);
    });
};

/*
* Get a video by ID
*/
module.exports.videoById = function (req, res) {
  console.log('Finding videos details: ' + req.params);
  if(req.params && req.params.videoid){
    Vid
    .findById(req.params.videoid)
    .exec(function(err, video){
      if(!video){
        sendJSONresponse(res, 404, {"message": "No video found."});
        return;
      }else if(err){
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, video);
    });
  }else{
    sendJSONresponse(res, 404, {
      "message" : "No video in request"
    });
  }
};

/*
* Create a video
*/
module.exports.addVideo = function(req, res){
  getAuthor(req, res, function(req, res, user){
    if(req.body){
      Vid.create({
        name: req.body.name,
        description: req.body.description,
        user: user,
        category: req.body.category
      }, function(err, body){
        if(err){
          sendJSONresponse(res, 404, err);
        }else{
          sendJSONresponse(res, 201, body);
        } 
      });
    }else{
      sendJSONresponse(res, 404, {
        "message" : "No video in request to save"
      });
    }
  });
}

/*
* Update a Video
*/
module.exports.updateVideo = function(req, res){
  getAuthor(req, res, function(req, res, userName){
    if (!req.params.videoid) {
      sendJSONresponse(res, 404, {
        "message": "Not found, videoid is required"
      });
      return;
    }
    Vid
      .findById(req.params.videoid)
      .select('-comments')
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

          video.name = req.body.name;
          video.description = req.body.description;
          video.category = {
            name: req.body.category.name,
            description: req.body.category.description
          };
          video.save(function(err, video) {
            if (err) {
              sendJSONresponse(res, 404, err);
            } else {
              sendJSONresponse(res, 200, video);
            }
          });
        }
      );
  }); 
}

/*
* Delete Video by ID
*/
module.exports.deleteVideo = function(req, res){
  getAuthor(req, res, function(req, res, userName){
    var videoid = req.params.videoid;
    if (videoid) {
      Vid
        .findByIdAndRemove(videoid)
        .exec(
          function(err, video) {
            if (err) {
              console.log(err);
              sendJSONresponse(res, 404, err);
              return;
            }
            console.log("video id " + videoid + " deleted");
            sendJSONresponse(res, 204, null);
          }
      );
    } else {
      sendJSONresponse(res, 404, {
        "message": "No videoid"
      });
    }
  });
}
