(function(){
  angular
  .module('videx')
  .controller('visualizarController', visualizarController);

  visualizarController.$inject = ['$routeParams'];
  function visualizarController($routeParams){
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
          <strong>${elem.author}</strong>:
          <em>${elem.text}</em>
          </div>`);
        }).join(" ");

      document.getElementById('messages').innerHTML = html;
    }

    vm.sendMessage = function(){
      var atr = vm.username;
      var txt = vm.texto;

      if (atr == '' || txt == '' ) return false;

      var message = {
        author: atr,
        text: txt
      };
      vm.username="";
      vm.texto="";
      socket.emit('new-message', message);
      return false;
    }
    
  }
  
})();