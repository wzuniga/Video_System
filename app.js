var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var Log = require("Log");
//var log = new Log('debug');

var port = process.env.PORT || 3000;

app.use(express.static(__dirname + "/public"));

app.get('/',function(req, res){
  res.redirect('index.html')
});
var i = 0;
io.on('connection', function(socket){
  socket.on('stream', function(image){
    //console.log(i++);
    io.sockets.emit('stream',image);
  });
});

http.listen(port,function(){
  //log.info('Servidor escuchando a travez de %s',port);
});
