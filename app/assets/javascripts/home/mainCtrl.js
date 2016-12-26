angular.module('chilBlog').controller('mainCtrl', [
'$scope', 'posts', 'Auth', function($scope, posts, Auth){
    $scope.posts = posts.posts
    console.log($scope.posts)
    $scope.signedIn = Auth.isAuthenticated;

      $scope.addPost = function(){
        if(!$scope.title || $scope.title === '') { return; }
        posts.create({
          title: $scope.title,
          body: $scope.body,
        });
        $scope.title = '';
        $scope.body= '';
      };

      $scope.incrementUpvotes = function(post) {
       posts.upvote(post);
     };

     Auth.currentUser().then(function (user){
         $scope.user = user;
       });

}])
