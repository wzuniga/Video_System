(function(){
   angular.module('videx', ['ngRoute', 'ui.bootstrap']);
   function config($routeProvider, $locationProvider){
      $routeProvider
         .when('/', {
            templateUrl: 'home/home.view.html',
            controller: 'homeController',
            controllerAs: 'vm'
         })
         .when('/emitir', {
            templateUrl: 'emitir/emitir.view.html',
            controller: 'emitirController',
            controllerAs: 'vm'
         })
         .when('/visualizar/:videoid', {
            templateUrl: 'visualizar/visualizar.view.html',
            controller: 'visualizarController',
            controllerAs: 'vm'
         })
         .otherwise({redirectTo: '/'});
      $locationProvider.html5Mode(true);
   }

   angular
      .module('videx')
      .config(['$routeProvider', '$locationProvider', config]);
})();
