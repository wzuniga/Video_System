(function(){
   angular
      .module('videx')
      .service('videxData', videxData);

   function videxData($http, authentication) {
      var getVideos = function(){
         return $http.get('api/videos');
      };
      var addUser = function(userData) {
         return $http.post('api/users/', userData);
      };
      var addComment = function(comment){
          return $http.post("/api/videos/"+comment.id+"/comments", comment, {
              headers:{
                  Authorization: "Bearer " + authentication.getToken()
              }
          });
      };

      return {
         getVideos: getVideos,
         addUser: addUser,
         addComment: addComment
      };
   }
})();
