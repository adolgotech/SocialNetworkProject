var app = angular.module("app", []);

app.controller("PostsCtrl", function($scope, PostsSvc){
    // this function runs when the "Add Post" button is clicked
    $scope.addPost = function(){
        // only add a post if there is a body
        if($scope.postBody){
            PostsSvc.create({
                username: "taylorxxx",
                body: $scope.postBody
            }).success(function(post){
                $scope.posts.unshift(post);
                $scope.postBody = null;
            });
        }
    };

    PostsSvc.fetch()
    .success(function(posts){
        $scope.posts = posts;
    });
});

app.service("PostsSvc", function($http){
  this.fetch = function(){
    return $http.get("/api/posts");
  };

  this.create = function(post){
    return $http.post("/api/posts");
  }
})
