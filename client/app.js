// MODULE
var app = angular.module('app', ['ngRoute', 'ngResource',"chart.js","ngCookies"]);

app.factory('dataService',function(){
  var _dataObj = {};
   return {
     dataObj: _dataObj
   };
})

// ROUTES
app.config(function ($routeProvider) {

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
    .when('/chart',{
      templateUrl: 'pages/chart.html',
      controller: 'chartController'
    })

});

// CONTROLLERS
app.controller('homeController', ['$scope','$http', 'dataService',function($scope,$http,dataService) {
  $scope.data = [];

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
          $http.get('/api/poll').then(function(response){
              $scope.data = response.data;
            })

      })
           .error(function(err){
               console.log(err);
      });
    }
    }
]);



app.controller('forecastController', ['$scope','$http' ,function($scope,$http) {
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

app.controller('loginController',['$scope',function($scope){
 $scope.status = "test";

}])

app.controller('chartController',['$scope','dataService',"$cookies",'$http',
function($scope,dataService,$cookies,$http){
  $scope.cookie = "";
  console.log($cookies);

  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
  $scope.data = [3, 5, 0];
  dataService.dataObj = $scope.data;


}])


app.controller("piechart",['$scope','dataService',function($scope,dataService){
  $scope.labels = ["Download Sales", "In-Store Sales", "Mail-Order Sales"];
    $scope.data = dataService;
}])

app.controller("navBarController",['$scope','dataService','$http',
function($scope,dataService,$http){
  $http.get('/api/info').then(function(response){
    var loggedIn = response.data.passport;

    console.log(loggedIn);
    if(typeof loggedIn=='undefined') {
        $scope.loginStatus="Log In";
    }else{
        $scope.loginStatus= response.data.passport.user.username;
    }


  })

}])
