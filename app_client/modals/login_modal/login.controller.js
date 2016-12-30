(function(){
   angular
      .module('videx')
      .controller('loginController', loginController);
   
   loginController.$inject = ['$route','$location','$uibModalInstance', '$uibModal','authentication'];
   function loginController( $route ,$location, $uibModalInstance, $uibModal, authentication){
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
      vm.popupRegisterForm = function(){
         vm.modal.close();
         var modalInstance = $uibModal.open({
             templateUrl: '/modals/register_modal/register.modal.html',
             controller: 'registerController as vm'
         });
      }; 
      
      vm.returnPage = $location.search().page || '/';
      
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
