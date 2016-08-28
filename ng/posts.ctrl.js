angular.module('app')
.controller("PostsCtrl", function($scope, PostsSvc){
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
});
