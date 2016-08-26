angular.module('app')
.controller("PostsCtrl", function($scope, $http, PostsSvc){
    // this function runs when the "Add Post" button is clicked
    $scope.addPost = function(){
        // only add a post if there is a body
        if($scope.postBody){
            // PostsSvc.create({
            //     username: 'taylorxxx',
            //     body: $scope.postBody
            // }).success(function(post){
            //     $scope.posts.unshift(post);
            //     $scope.postBody = null;
            // });
            $http.post('api/posts', {
              username: 'taylorxxx',
              body: $scope.postBody
            }).then(function(post){
              $scope.posts.unshift(post);
              $scope.postBody = null;
            }/*, function(err){
              console.log(err);
            }*/);
        }
    };

    $http.get('/api/posts')
    .then(function(posts){
        $scope.posts = posts.data;
    });
});
