angular.module('myApp', ['ui.bootstrap'])
  .controller('MovieController', ["$scope", "imdbService", function($scope, imdbService) {
    var paramObj = {};
    var pendingTask;

    if($scope.search === undefined) {
      $scope.async = "Game of thrones";
      $scope.search = "Game of thrones";
      $scope.season = "1";
      $scope.episode = "";
      $scope.ID = "";

      paramObj = {
        t: $scope.search,
        season: $scope.season,
        plot: "full"
      };

      fetch(paramObj);
    }
    $scope.getSuggest = function(val) {
      return imdbService.events({ s: val }).then(function(response) {
        return response.data.Search.map(function(item){
          return {
            list : item,
            suggest: item.Title + " " + item.Year
          };
        });
      });
    };

    function fetch(paramObj) {
      if(!$scope.ID) {
        if($scope.season && $scope.episode) {
          paramObj = {
            t: $scope.search,
            season: $scope.season,
            episode: $scope.episode,
            plot: "full"
          };
        }
        else {
          paramObj = {
            t: $scope.search,
            plot: "full"
          };
        }
      }
      else {
        paramObj = {
          i: $scope.ID,
          plot: "full"
        };
      }
      imdbService.events(paramObj).success(function(resp) { $scope.details = resp; });
      $scope.ID = "";

      if($scope.season) {
        paramObj = {
          t: $scope.search,
          season: $scope.season,
          plot: "full"
        };
        imdbService.events(paramObj)
          .success(function(resp) { $scope.ep = resp; });
      }
    }

    $scope.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    $scope.$watch('async', function() {
      if(!$scope.async) {
        $scope.details = null;
        $scope.season = $scope.episode = null;
      }
      else {
        $scope.search = $scope.async.list.Title;
        $scope.season = $scope.episode = null;
        setTimeout(fetch(paramObj), 800);
      }
    }, true);

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
