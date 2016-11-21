var mongoose = require('mongoose');
var Us = mongoose.model('User');

var sendJSONresponse = function(res, status, content) {
  res.status(status);
  res.json(content);
};

module.exports.userList = function (req, res) {
  Us
    .find()
    .exec(function(err, users){
      if(!users){
        sendJSONresponse(res, 404, {"message": "No users found."});
        return;
      }else if(err){
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, users);
    });
};

module.exports.userById = function(req, res){
  if(req.params && req.params.userid){
    Us
    .findById(req.params.userid)
    .exec(function(err, user){
      if(!user){
        sendJSONresponse(res, 404, {"message": "No user found."});
        return;
      }else if(err){
        sendJSONresponse(res, 404, err);
        return;
      }
      sendJSONresponse(res, 200, user);
    });
  }else{
    sendJSONresponse(res, 404, {
      "message" : "No user in request"
    });
  }
};

module.exports.addUser = function(req, res){
  if(req.body){
    Us.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    }, function(err, body)
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
}