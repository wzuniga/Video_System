(function(){
   angular
      .module('videx')
      .service('videxData', videxData);

   function videxData($http) {
      var getVideos = function(){
         return $http.get('api/videos');
      };
      var addUser = function(userData) {
         return $http.post('api/users/', userData);
      };
      return {
         getVideos: getVideos,
         addUser: addUser
      };
   }
})();
