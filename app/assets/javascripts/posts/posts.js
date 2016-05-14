angular.module('flapperNews')
.factory('posts', ['$http', function($http){
  var o = {
    posts: []
  };
  ///gets all posts
  o.getAll = function(){
      return  $http.get('/posts.json').success(function(data){
          angular.copy(data, o.posts);
      })
  };

  //add new post
  o.create = function(post){
      return $http.post('/posts.json', post).success(function(data){
          o.posts.push(data);
      })
  }

  ///update upvotes
  o.upvote = function(post){
      console.log(post.id);
      return $http.post('/posts/'+post.id+'/upvote.json')
        .success(function(data){
            post.upvotes+=1;
        })
  }

  o.get = function(id) {
      return $http.get('/posts/' + id + '.json')
      .then(function(res){
        return res.data;
      });
    };

    o.addComment = function(id, comment) {
      return $http.post('/posts/' + id + '/comments.json', comment);
    };

    o.upvoteComment = function(post, comment) {
      return $http.put('/posts/' + post.id + '/comments/'+ comment.id + '/upvote.json')
        .success(function(data){
          comment.upvotes += 1;
        });
    };

  return o;
}])
