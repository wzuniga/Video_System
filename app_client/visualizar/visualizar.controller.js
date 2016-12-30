(function(){
  angular
  .module('videx')
  .controller('visualizarController', visualizarController);

  function visualizarController($routeParams, videxData){
    var vm = this;

    vm.videoid = $routeParams.videoid;
    vm.pageHeader = {
       title: vm.videoid
    };

    var socket = io();
    var i = 0;
    socket.on('stream',function(image){
      var img = document.getElementById("play");
      img.src = image;
    });

    //message
    socket.on('messages', function(data) {
      console.log(data);
      render(data);
    })

    function render (data) {
      var html = data.map(function(elem, index) {
        return(`<div class="well well-sm">
          <em>${elem.text}</em>
          </div>`);
        }).join(" ");

      document.getElementById('messages').innerHTML = html;
    }
    

    vm.sendMessage = function(){
      var atr = vm.username;
      var txt = vm.texto;

      if (txt == '' ) return false;

      var message = {
        author: atr,
        text: txt
      };
      var messgeToApi = {
        id: vm.videoid,
        comment: txt
      };

      videxData.addComment(messgeToApi)
      .success(function(data){
        console.log(data);
      });




      vm.username="";
      vm.texto="";
      socket.emit('new-message', message);
      return false;
    }
    
  }
  
})();