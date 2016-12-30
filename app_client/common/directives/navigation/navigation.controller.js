(function () {

  angular
    .module('videx')
    .controller('navigationCtrl', navigationCtrl);

  navigationCtrl.$inject = ['$route','$location', '$uibModal', 'authentication'];
  function navigationCtrl($route, $location, $uibModal, authentication) {
    var vm = this;
    
    vm.currentPath = $location.path();

    vm.isLoggedIn = authentication.isLoggedIn();

    vm.currentUser = authentication.currentUser();

    vm.logout = function() {
      authentication.logout();
      $location.path('/');
      $route.reload();
    };

    vm.popupLoginForm = function(){
         var modalInstance = $uibModal.open({
            templateUrl: '/modals/login_modal/login.modal.html',
            controller: 'loginController as vm'
         });
    };

    vm.popupRegisterForm = function(){
       var modalInstance = $uibModal.open({
          templateUrl: '/modals/register_modal/register.modal.html',
          controller: 'registerController as vm'
       });
    }; 

  }
})();