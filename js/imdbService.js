
angular.module('myApp')
  .factory('imdbService', ["$http", function($http) {

    var runUserRequest = function(paramObj) {
      return $http({
        method: 'GET',
        url: "http://www.omdbapi.com/",
        params: paramObj
      });
    };

    return {
      events: function(paramObj) {
        return runUserRequest(paramObj);
      }
    };
  }]);
