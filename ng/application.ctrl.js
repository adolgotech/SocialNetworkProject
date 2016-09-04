angular.module('app')
.controller('ApplicationCtrl', function ($scope, $location, UserSvc) {
  $scope.$on('login', function (_, user) {
    $scope.currentUser = user;
    $location.path('/');
  })

  $scope.$on('register', function () {
    $location.path('/login');
  })

  $scope.logout = function () {
    delete $scope.currentUser;
    UserSvc.logout();
    $location.path('/');
  }
})
