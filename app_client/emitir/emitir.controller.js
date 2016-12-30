(function(){
   angular
      .module('videx')
      .controller('emitirController', emitirController);
   
   function emitirController(){
      var vm = this;

      vm.pageHeader = {
         title: 'Emitir VideoStream'
      };


    var canvas = document.getElementById("preview");
    var context = canvas.getContext("2d");

    canvas.width = 800;
    canvas.height = 600;

    context.width = canvas.width;
    context.height = canvas.height;

    var video = document.getElementById("video");

    var socket = io();

    function logger(msg){
      //document.getElementById('logger').  text(msg);
    }

    function loadCam(stream){
      video.src = window.URL.createObjectURL(stream);
      logger("Camara cargada");
    }

    function failCam() {
      logger("camara no conectada!");
    }

    function viewVideo(video, context) {
      context.drawImage(video,0,0,context.width,context.height);
      socket.emit('stream',canvas.toDataURL('image/webp'));
    }
    var i = 0;

    navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
    if(navigator.getUserMedia){
      navigator.getUserMedia({video : true},loadCam,failCam);
    }
    setInterval(function(){
      viewVideo(video, context);
    },1);
  
   };

})();
