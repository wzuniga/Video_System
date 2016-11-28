(function(){
   angular
      .module('videx')
      .controller('registerController', registerController);
      
   function registerController($uibModalInstance, videxData){
      var vm = this;
      vm.modal = { 
         cancel: function(){
            $uibModalInstance.dismiss('cancel');
         },  
         close: function(result){
            $uibModalInstance.close(result);
         }   
      };

      vm.onSubmit = function(){
         console.log(vm.formData);
         videxData.addUser({
            name: vm.formData.name,
            email: vm.formData.email,
            password: vm.formData.pass
            })
         .success(function(data){
            vm.modal.close(data);
            console.log("SUccess");
          })
         .error(function(data){
            console.log("Error puto.");
         });
         
         return false;
      };
   }
})();

