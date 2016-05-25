// MODULE
var weatherApp = angular.module('weatherApp', ['ngRoute', 'ngResource']);

// ROUTES
weatherApp.config(function ($routeProvider) {

    $routeProvider

    .when('/', {
        templateUrl: 'pages/home.htm',
        controller: 'homeController'
    })

    .when('/forecast', {
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



}]);

weatherApp.controller('forecastController', ['$scope', function($scope) {

}]);
