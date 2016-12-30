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
  }
})();