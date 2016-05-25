// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })

    .when('/post', {
        templateUrl: 'pages/forecast.htm',
        controller: 'forecastController'
    })

});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope','$http', function($scope,$http) {
  $scope.data = "clicked";
  $http.get('/api/poll').then(function(response){
      $scope.data = response.data;
    })
    $scope.colorValue = "submitted";

}]);

weatherApp.controller('forecastController', ['$scope','$http' ,function($scope,$http) {
  $scope.choices = [];
  $scope.postPoll = function(){
    $http({
        method:"post",
        url: "/api/poll",
        headers : {'Content-Type': 'application/json'},
        data : {
          question:$scope.question,
          choice:  $scope.choices,

          }
    })
        .success(function(result){
        $scope.status = result;

    })
         .error(function(err){
             console.log(err);
    });
  }

}]);
