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
    alert(vm.videoid);

    var socket = io();
    var i = 0;
    socket.on('stream',function(image){
      var img = document.getElementById("play");
      img.src = image;
    });

    vm.sendMessage = function(){
      alert("ok");
    }
    
  }
  
})();