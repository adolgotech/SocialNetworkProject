angular.module('app')
.controller("PostsCtrl", function($scope, PostsSvc){
    // this function runs when the "Add Post" button is clicked
    $scope.addPost = function(){
        // only add a post if there is a body
        if($scope.postBody){
            PostsSvc.create({
                body: $scope.postBody
            }).then(function(post){
                if(post.status == 201) {
                  $scope.postBody = null;
                }
            });
        }
    };

    $scope.$on('ws:new_post', function(_, post) {
      $scope.$apply(function() {
        $scope.posts.unshift(post);
      })
    })

    PostsSvc.fetch()
    .then(function(posts){
        $scope.posts = posts.data;
    });
});
