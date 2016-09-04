angular.module('app')
.controller('RegisterCtrl', function($scope, UserSvc) {
  $scope.register = function(username, password) {
    UserSvc.register(username, password)
    .then(function(response){
      if(response) {
        $scope.$emit('register');
        $scope.username = null;
        $scope.password = null;
      }
    });
  }
});
