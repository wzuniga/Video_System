(function(){
   angular
      .module('videx')
      .controller('loginController', loginController);
   
   loginCtroller.$inject = ['$location','authentication'];
   function loginController($uibModalInstance, authentication){
      var vm = this;

      vm.pageHeader = {
         title: 'login'
      };

      vm.credentials = {
         email : "",
         password : ""
      };
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
            if (!vm.credentials.email || !vm.credentials.password) {
         vm.formError = "All fields required, please try again";
            return false;
         } else {
         vm.doLogin();
         }
      };


      vm.doLogin = function() {
         vm.formError = "";
         authentication
            .login(vm.credentials)
            .success(function(data){
               vm.modal.close(data);
            })
            .error(function(err){
               vm.formError = err;
            })
        .then(function(){
            $location.search('page', null); 
            $location.path(vm.returnPage);
        });
      }; 
   }
})();
