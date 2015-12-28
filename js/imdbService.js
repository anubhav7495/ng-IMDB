
angular.module('myApp')
  .factory('imdbService', ["$http", function($http) {
    var omdbUrl = "http://www.omdbapi.com";

    var runUserRequest = function(path) {
      return $http({
        method: 'GET',
        url: omdbUrl + path
      });
    };

    return {
      events: function(path) {
        return runUserRequest(path);
      }
    };
  }]);
