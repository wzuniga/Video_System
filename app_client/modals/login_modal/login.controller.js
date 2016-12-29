(function(){
   angular
      .module('videx')
      .controller('loginController', loginController);
   
   function loginController($uibModalInstance, videxData){
      var vm = this;
      vm.modal = {
         cancel: function(){
            $uibModalInstance.dismiss('cancel');
         },
         close: function(result){
            $uibModalInstance.close(result);
         }
      }; 
   }
})();
