var mongoose = require('mongoose');
var Vid = mongoose.model('Video');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

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

module.exports.videoById = function (req, res) {
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