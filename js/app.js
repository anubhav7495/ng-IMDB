'use strict';

angular.module('myApp', [])
  .controller('MovieController', function($scope, $http){
    var pendingTask;

    if($scope.search === undefined){
      $scope.search = "Star Wars: The Force Awakens";
      $scope.season;
      $scope.episode;
      $scope.ID;
      $scope.Year = "";
      fetch();
    }

    $scope.change = function(){
      if(pendingTask){
        clearTimeout(pendingTask);
      }
      pendingTask = setTimeout(fetch, 800);
    };

    function fetch(){
      if(!$scope.episode) {
        $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&y=" + $scope.Year + "&tomatoes=true&plot=full")
         .success(function(response){ $scope.details = response; });
      }
      else {
        $http.get("http://www.omdbapi.com/?i=" + $scope.ID + "&tomatoes=true&plot=full")
         .success(function(response){ $scope.details = response; });

      }

      $http.get("http://www.omdbapi.com/?s=" + $scope.search)
       .success(function(response){  $scope.related = response; });

      if($scope.season)
        $http.get("http://www.omdbapi.com/?t=" + $scope.search + "&season=" + $scope.season)
          .success(function(response){ $scope.ep = response; });
    }

    $scope.update = function(data){
      $scope.search = data.Title;
      if(data.Episode) {
        $scope.ID = data.imdbID;
        $scope.episode = data.Episode;
      }
      $scope.change();
    };

    $scope.select = function(){
      this.setSelectionRange(0, this.value.length);
    }
  });
