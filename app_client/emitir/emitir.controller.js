(function(){
   angular
      .module('videx')
      .controller('emitirController', emitirController);
   
   function emitirController(){
      var vm = this;

      vm.pageHeader = {
         title: 'Emitir VideoStream'
      };
   };

})();
