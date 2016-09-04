angular.module('app')
.service('UserSvc', function($http){
  var svc = this;
  svc.getUser = function(){
    return $http.get('/api/users');
  }

  svc.login = function(username, password){
    return $http.post('/api/sessions', {
      'username': username, 'password': password
    }).then(function(val){
      svc.token = val.data;
      $http.defaults.headers.common['X-Auth'] = val.data;
      return svc.getUser();
    });
  }

  svc.logout = function(){
    svc.token = '';
    $http.defaults.headers.common['X-Auth'] = '';
  }

  svc.register = function(username, password) {
    return $http.post('/api/users', {
      'username': username, 'password': password
    }).then(function(res){
      if(res.status == 201) {
        return true;
        // return svc.login(username, password);
      } else {
        return false;
      }
    });
  }
});
