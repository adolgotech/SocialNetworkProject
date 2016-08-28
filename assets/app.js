angular.module('app', [
  'ngRoute'
]);

angular.module('app')
.controller('ApplicationCtrl', ["$scope", function($scope) {
  $scope.$on('login', function(_, user) {
    $scope.currentUser = user;
  })
}])

angular.module('app')
.controller('LoginCtrl', ["$scope", "UserSvc", function($scope, UserSvc){
  $scope.login = function(username, password) {
    UserSvc.login(username, password)
    .then(function(response){
      $scope.$emit('login', response.data);
    });
  }
}]);

angular.module('app')
.controller("PostsCtrl", ["$scope", "PostsSvc", function($scope, PostsSvc){
    // this function runs when the "Add Post" button is clicked
    $scope.addPost = function(){
        // only add a post if there is a body
        if($scope.postBody){
            PostsSvc.create({
                username: 'taylorxxx',
                body: $scope.postBody
            }).then(function(post){
                $scope.posts.unshift(post.data);
                $scope.postBody = null;
            });
        }
    };

    PostsSvc.fetch()
    .then(function(posts){
        $scope.posts = posts.data;
    });
}]);

angular.module('app')
.service('PostsSvc', ["$http", function($http){
  this.fetch = function(){
    return $http.get("/api/posts");
  };

  this.create = function(post){
    return $http.post("/api/posts", post);
  };
}]);

angular.module('app')
.config(["$routeProvider", function($routeProvider){
  $routeProvider
  .when('/', { controller: 'PostsCtrl', templateUrl: 'posts.html' })
  .when('/register', { controller: 'RegisterCtrl', templateUrl: 'register.html' })
  .when('/login', { controller: 'LoginCtrl', templateUrl: 'login.html' })
}]);

angular.module('app')
.service('UserSvc', ["$http", function($http){
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
}]);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm1vZHVsZS5qcyIsImFwcGxpY2F0aW9uLmN0cmwuanMiLCJsb2dpbi5jdHJsLmpzIiwicG9zdHMuY3RybC5qcyIsInBvc3RzLnN2Yy5qcyIsInJvdXRlcy5qcyIsInVzZXIuc3ZjLmpzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFFBQUEsT0FBQSxPQUFBO0VBQ0E7OztBQ0RBLFFBQUEsT0FBQTtDQUNBLFdBQUEsOEJBQUEsU0FBQSxRQUFBO0VBQ0EsT0FBQSxJQUFBLFNBQUEsU0FBQSxHQUFBLE1BQUE7SUFDQSxPQUFBLGNBQUE7Ozs7QUNIQSxRQUFBLE9BQUE7Q0FDQSxXQUFBLG1DQUFBLFNBQUEsUUFBQSxRQUFBO0VBQ0EsT0FBQSxRQUFBLFNBQUEsVUFBQSxVQUFBO0lBQ0EsUUFBQSxNQUFBLFVBQUE7S0FDQSxLQUFBLFNBQUEsU0FBQTtNQUNBLE9BQUEsTUFBQSxTQUFBLFNBQUE7Ozs7O0FDTEEsUUFBQSxPQUFBO0NBQ0EsV0FBQSxvQ0FBQSxTQUFBLFFBQUEsU0FBQTs7SUFFQSxPQUFBLFVBQUEsVUFBQTs7UUFFQSxHQUFBLE9BQUEsU0FBQTtZQUNBLFNBQUEsT0FBQTtnQkFDQSxVQUFBO2dCQUNBLE1BQUEsT0FBQTtlQUNBLEtBQUEsU0FBQSxLQUFBO2dCQUNBLE9BQUEsTUFBQSxRQUFBLEtBQUE7Z0JBQ0EsT0FBQSxXQUFBOzs7OztJQUtBLFNBQUE7S0FDQSxLQUFBLFNBQUEsTUFBQTtRQUNBLE9BQUEsUUFBQSxNQUFBOzs7O0FDbEJBLFFBQUEsT0FBQTtDQUNBLFFBQUEsc0JBQUEsU0FBQSxNQUFBO0VBQ0EsS0FBQSxRQUFBLFVBQUE7SUFDQSxPQUFBLE1BQUEsSUFBQTs7O0VBR0EsS0FBQSxTQUFBLFNBQUEsS0FBQTtJQUNBLE9BQUEsTUFBQSxLQUFBLGNBQUE7Ozs7QUNQQSxRQUFBLE9BQUE7Q0FDQSwwQkFBQSxTQUFBLGVBQUE7RUFDQTtHQUNBLEtBQUEsS0FBQSxFQUFBLFlBQUEsYUFBQSxhQUFBO0dBQ0EsS0FBQSxhQUFBLEVBQUEsWUFBQSxnQkFBQSxhQUFBO0dBQ0EsS0FBQSxVQUFBLEVBQUEsWUFBQSxhQUFBLGFBQUE7OztBQ0xBLFFBQUEsT0FBQTtDQUNBLFFBQUEscUJBQUEsU0FBQSxNQUFBO0VBQ0EsSUFBQSxNQUFBO0VBQ0EsSUFBQSxVQUFBLFVBQUE7SUFDQSxPQUFBLE1BQUEsSUFBQTs7O0VBR0EsSUFBQSxRQUFBLFNBQUEsVUFBQSxTQUFBO0lBQ0EsT0FBQSxNQUFBLEtBQUEsaUJBQUE7TUFDQSxZQUFBLFVBQUEsWUFBQTtPQUNBLEtBQUEsU0FBQSxJQUFBO01BQ0EsSUFBQSxRQUFBLElBQUE7TUFDQSxNQUFBLFNBQUEsUUFBQSxPQUFBLFlBQUEsSUFBQTtNQUNBLE9BQUEsSUFBQTs7OztBQUlBIiwiZmlsZSI6ImFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbImFuZ3VsYXIubW9kdWxlKCdhcHAnLCBbXG4gICduZ1JvdXRlJ1xuXSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdBcHBsaWNhdGlvbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUpIHtcbiAgJHNjb3BlLiRvbignbG9naW4nLCBmdW5jdGlvbihfLCB1c2VyKSB7XG4gICAgJHNjb3BlLmN1cnJlbnRVc2VyID0gdXNlcjtcbiAgfSlcbn0pXG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb250cm9sbGVyKCdMb2dpbkN0cmwnLCBmdW5jdGlvbigkc2NvcGUsIFVzZXJTdmMpe1xuICAkc2NvcGUubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpIHtcbiAgICBVc2VyU3ZjLmxvZ2luKHVzZXJuYW1lLCBwYXNzd29yZClcbiAgICAudGhlbihmdW5jdGlvbihyZXNwb25zZSl7XG4gICAgICAkc2NvcGUuJGVtaXQoJ2xvZ2luJywgcmVzcG9uc2UuZGF0YSk7XG4gICAgfSk7XG4gIH1cbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uY29udHJvbGxlcihcIlBvc3RzQ3RybFwiLCBmdW5jdGlvbigkc2NvcGUsIFBvc3RzU3ZjKXtcbiAgICAvLyB0aGlzIGZ1bmN0aW9uIHJ1bnMgd2hlbiB0aGUgXCJBZGQgUG9zdFwiIGJ1dHRvbiBpcyBjbGlja2VkXG4gICAgJHNjb3BlLmFkZFBvc3QgPSBmdW5jdGlvbigpe1xuICAgICAgICAvLyBvbmx5IGFkZCBhIHBvc3QgaWYgdGhlcmUgaXMgYSBib2R5XG4gICAgICAgIGlmKCRzY29wZS5wb3N0Qm9keSl7XG4gICAgICAgICAgICBQb3N0c1N2Yy5jcmVhdGUoe1xuICAgICAgICAgICAgICAgIHVzZXJuYW1lOiAndGF5bG9yeHh4JyxcbiAgICAgICAgICAgICAgICBib2R5OiAkc2NvcGUucG9zdEJvZHlcbiAgICAgICAgICAgIH0pLnRoZW4oZnVuY3Rpb24ocG9zdCl7XG4gICAgICAgICAgICAgICAgJHNjb3BlLnBvc3RzLnVuc2hpZnQocG9zdC5kYXRhKTtcbiAgICAgICAgICAgICAgICAkc2NvcGUucG9zdEJvZHkgPSBudWxsO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cbiAgICB9O1xuXG4gICAgUG9zdHNTdmMuZmV0Y2goKVxuICAgIC50aGVuKGZ1bmN0aW9uKHBvc3RzKXtcbiAgICAgICAgJHNjb3BlLnBvc3RzID0gcG9zdHMuZGF0YTtcbiAgICB9KTtcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uc2VydmljZSgnUG9zdHNTdmMnLCBmdW5jdGlvbigkaHR0cCl7XG4gIHRoaXMuZmV0Y2ggPSBmdW5jdGlvbigpe1xuICAgIHJldHVybiAkaHR0cC5nZXQoXCIvYXBpL3Bvc3RzXCIpO1xuICB9O1xuXG4gIHRoaXMuY3JlYXRlID0gZnVuY3Rpb24ocG9zdCl7XG4gICAgcmV0dXJuICRodHRwLnBvc3QoXCIvYXBpL3Bvc3RzXCIsIHBvc3QpO1xuICB9O1xufSk7XG4iLCJhbmd1bGFyLm1vZHVsZSgnYXBwJylcbi5jb25maWcoZnVuY3Rpb24oJHJvdXRlUHJvdmlkZXIpe1xuICAkcm91dGVQcm92aWRlclxuICAud2hlbignLycsIHsgY29udHJvbGxlcjogJ1Bvc3RzQ3RybCcsIHRlbXBsYXRlVXJsOiAncG9zdHMuaHRtbCcgfSlcbiAgLndoZW4oJy9yZWdpc3RlcicsIHsgY29udHJvbGxlcjogJ1JlZ2lzdGVyQ3RybCcsIHRlbXBsYXRlVXJsOiAncmVnaXN0ZXIuaHRtbCcgfSlcbiAgLndoZW4oJy9sb2dpbicsIHsgY29udHJvbGxlcjogJ0xvZ2luQ3RybCcsIHRlbXBsYXRlVXJsOiAnbG9naW4uaHRtbCcgfSlcbn0pO1xuIiwiYW5ndWxhci5tb2R1bGUoJ2FwcCcpXG4uc2VydmljZSgnVXNlclN2YycsIGZ1bmN0aW9uKCRodHRwKXtcbiAgdmFyIHN2YyA9IHRoaXM7XG4gIHN2Yy5nZXRVc2VyID0gZnVuY3Rpb24oKXtcbiAgICByZXR1cm4gJGh0dHAuZ2V0KCcvYXBpL3VzZXJzJyk7XG4gIH1cblxuICBzdmMubG9naW4gPSBmdW5jdGlvbih1c2VybmFtZSwgcGFzc3dvcmQpe1xuICAgIHJldHVybiAkaHR0cC5wb3N0KCcvYXBpL3Nlc3Npb25zJywge1xuICAgICAgJ3VzZXJuYW1lJzogdXNlcm5hbWUsICdwYXNzd29yZCc6IHBhc3N3b3JkXG4gICAgfSkudGhlbihmdW5jdGlvbih2YWwpe1xuICAgICAgc3ZjLnRva2VuID0gdmFsLmRhdGE7XG4gICAgICAkaHR0cC5kZWZhdWx0cy5oZWFkZXJzLmNvbW1vblsnWC1BdXRoJ10gPSB2YWwuZGF0YTtcbiAgICAgIHJldHVybiBzdmMuZ2V0VXNlcigpO1xuICAgIH0pO1xuICB9XG59KTtcbiJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==
