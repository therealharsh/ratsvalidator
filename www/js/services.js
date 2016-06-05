var app = angular.module('ratsValidator.services', []);
var db = null;

app.factory('Dash', function($http) {
  var posts = [];

  return {
    posts: function() {
      return posts;
    },

    addPost: function(newPost) {
      posts.push(newPost);
    },

    updatePosts: function(newPosts) {
      posts = newPosts;
    },

    recentPosts: function() {
      return $http({
        method: 'GET',
        url: 'http://localhost:3000/posts'
      });
    }
  }
});

app.factory('Entry', function($http) {
  var form = {};

  return {
    form: function() {
      return form;
    },

    // Simply reset each value in the form
    resetForm: function() {
      form = {};
    },

    login: function() {
      // Source: http://goo.gl/wPHJrE
      // Send login form data to the server
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/login',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }

          return str.join("&");
        },
        data: form
      });
    },

    signup: function() {
      // Source: http://goo.gl/wPHJrE
      // Send sign up form data to the server
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/signup',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        transformRequest: function(obj) {
          var str = [];
          for (var p in obj) {
            str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
          }

          return str.join("&");
        },
        data: form
      });
    }
  }
});

app.factory('NewPost', function($http) {
  var form = {};

  return {
    form: function() {
      return form;
    },

    clearForm: function() {
      form = {};
    },

    post: function(aid) {
      return $http({
        method: 'POST',
        url: 'http://localhost:3000/posts',
        params: {
          aid: aid
        },
        data: form
      });
    }
  }
});

app.factory('MyPosts', function($http) {
  return {

  }
});

app.factory('Messages', function($http) {
  return {

  }
});

app.factory('Account', function($http) {
  return {

  }
});