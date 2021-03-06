(function(){
   angular
      .module('videx')
      .controller('registerController', registerController);
   
   registerController.$inject = ['$location','$route','$uibModalInstance','authentication'];
   function registerController($location, $route, $uibModalInstance, authentication){
      var vm = this;

      vm.pageHeader = {
         title: 'register'
      };

      vm.credentials = {
         name : "",
         email : "",
         password : ""
      };

      vm.returnPage = $location.search().page || '/';

      vm.modal = { 
         cancel: function(){
            $uibModalInstance.dismiss('cancel');
         },  
         close: function(result){
            $uibModalInstance.close(result);
         }   
      };
      vm.onSubmit = function () {
         vm.formError = "";
         if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
            vm.formError = "All fields required, please try again";
            return false;
         } else {
            vm.doRegister();
         }
      };

      vm.doRegister = function() {
         vm.formError = "";
         authentication
            .register(vm.credentials)
            .success(function(data){
               vm.modal.close(data);
               $route.reload();
            })
            .error(function(err){
               vm.formError = err;
            })
            .then(function(){
               $location.search('page', null); 
               $location.path("/");
            });
      };
     
   }
})();

