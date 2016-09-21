var express = require('express');
var app = new express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

//var Log = require("Log");
//var log = new Log('debug');

var port = process.env.PORT || 3000;

var messages = [];

app.use(express.static(__dirname + "/public"));

app.get('/',function(req, res){
  res.redirect('index.html')
});
var i = 0;
io.on('connection', function(socket){

  io.sockets.emit('messages', messages);
  
  socket.on('stream', function(image){
    //console.log(i++);
    io.sockets.emit('stream',image);
  });

  socket.on('new-message', function(data) {
    messages.push(data);

    io.sockets.emit('messages', messages);
  });
});

http.listen(port,function(){
  //log.info('Servidor escuchando a travez de %s',port);
});
