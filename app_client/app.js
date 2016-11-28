(function(){
   angular.module('videx', ['ngRoute', 'ui.bootstrap']);
   function config($routeProvider, $locationProvider){
      $routeProvider
         .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeController',
            controllerAs: 'vm'
         })
         .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
   }

   angular
      .module('videx')
      .config(['$routeProvider', '$locationProvider', config]);
})();
