
angular.module('myApp', [])
  .controller('MovieController', ["$scope", "imdbService", function($scope, imdbService){
    var pendingTask;
    var path;

    if($scope.search === undefined){
      $scope.search = "Star Wars: The Force Awakens";
      $scope.Year = "";
      $scope.season = "";
      $scope.episode = "";
      $scope.ID = "";

      fetch();
    }

    $scope.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    function fetch() {
      if(!$scope.ID) {
        if($scope.season && $scope.episode) {
          path = "/?t="+$scope.search+"&season="+$scope.season+"&episode="+$scope.episode+"&tomatoes=true&plot=full";
        }
        else {
          path = "/?t="+$scope.search+"&y="+$scope.Year+"&tomatoes=true&plot=full";
        }
      }
      else {
        path = "/?i="+$scope.ID+"&tomatoes=true&plot=full";
      }
      imdbService.events(path).success(function(resp) { $scope.details = resp; });
      $scope.ID = "";

      imdbService.events("/?s="+$scope.search)
        .success(function(resp) { $scope.related = resp; });

      if($scope.season) {
        imdbService.events("/?t="+$scope.search+"&season="+$scope.season)
          .success(function(resp) { $scope.ep = resp; });
      }
    }

    $scope.update = function(data){
      if(data.Episode) {
        $scope.ID = data.imdbID;
      }
      else {
        $scope.search = data.Title;
        $scope.season = "";
      }
      $scope.change();
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    };

  }]);
