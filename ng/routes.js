angular.module('app')
.config(function($routeProvider, $locationProvider){
  $routeProvider
  .when('/', { controller: 'PostsCtrl', templateUrl: 'posts.html' })
  .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
  .when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' })
  .otherwise({ redirectTo: '/' })

  $locationProvider.html5Mode(true);
});
