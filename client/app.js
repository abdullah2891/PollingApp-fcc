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

    .when('/login', {
        templateUrl: 'pages/login.html',
        controller: 'loginController'
    })

});

// CONTROLLERS
weatherApp.controller('homeController', ['$scope','$http', function($scope,$http) {
  $scope.data = "clicked";
  $http.get('/api/poll').then(function(response){
      $scope.data = response.data;
    })

    $scope.option = "not clicked";

    $scope.post= function(question,vote){
      $scope.option = vote;

      $http({
          method:"post",
          url: "/api/vote/cast",
          headers : {'Content-Type': 'application/json'},
          data : {
            question:question,
            choiceID:  vote,

            }
      })
          .success(function(result){
          $scope.status = result;

      })
           .error(function(err){
               console.log(err);
      });
    }
    }
]);



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

weatherApp.controller('loginController',['$scope',function($scope){
 $scope.status = "test";

}])
