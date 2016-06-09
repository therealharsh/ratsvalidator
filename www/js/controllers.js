// Local storage is used to store important user information that is used
// in various controllers. Almost every controller has this statement:
//
// if (!localStorage.loggedIn) {
//   $state.go('login');
// }
//
// This statement just means that if local storage doesn't contain a "loggedIn"
// field, that means the user isn't logged in and will be redirected to the
// Login tab.

var app = angular.module('ratsValidator.controllers', []);

app.controller('DashCtrl', function($scope, $state, $ionicPopup, Dash) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

  $scope.posts;

  $scope.updatePosts = function() {
    Dash.recentPosts().then(function(res) {
      if (res.data.err) {
        $ionicPopup.alert({
          template: res.data.err
        });
      }

      // _.each(res.data.posts, function(post) {
      //   Dash.addPost(post);
      // });

      console.log(res.data.posts);

      Dash.updatePosts(res.data.posts);
      $scope.posts = Dash.posts();
    }, function(err) {
      $ionicPopup.alert({
        template: res.data.err
      });
    });
  }

  // Pull to refresh; fetch the most recent posts to display on the Home tab
  $scope.doRefresh = function() {
    $scope.updatePosts();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };

  $scope.updatePosts();
});

app.controller('LoginCtrl', function($scope, $state, $ionicPopup, $rootScope,
  Entry) {
  if (localStorage.loggedIn) {
    $state.go('tabs.dash');
  }

  $scope.form = Entry.form();

  $scope.login = function() {
    Entry.login().then(function(res) {
      // The user submitted incorrect credentials
      if (res.data.err) {
        $ionicPopup.alert({
          template: res.data.err
        });

        return;
      }

      // User successfully logged in; store essential info locally and redirect
      // user to the Home tab
      localStorage.loggedIn = 'true';
      localStorage.aid = res.data.aid;
      localStorage.username = res.data.username;
      $state.go('tabs.dash');
    }, function(err) {
      $ionicPopup.alert({
        template: err.data.err
      });
    });
  };

  // When a user logs out, their credentials are still filled out in the form,
  // so the form will be reset every time the state changes to login
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.url === '/login') {
      Entry.resetForm();
      $scope.form = Entry.form();
    }
  });
});

app.controller('SignupCtrl', function($scope, $state, $ionicPopup, Entry) {
  if (localStorage.loggedIn) {
    $state.go('tabs.dash');
  }

  Entry.resetForm();
  $scope.form = Entry.form();

  $scope.signup = function() {
    Entry.signup().then(function(res) {
      if (res.data.err) {
        $ionicPopup.alert({
          template: res.data.err
        });

        return;
      }

      // Signup was successful; redirect user back to login
      $ionicPopup.alert({
        template: res.data.msg
      });
      $state.go('login');
    }, function(err) {
      console.error(err.data.err);
      $ionicPopup.alert({
        template: 'There was an issue signing up. Please try again'
      });
    });
  };
});

app.controller('LogoutCtrl', function($scope, $state, $ionicHistory) {
  // Clear ionic cache and history and local storage when logging out
  $scope.logout = function() {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    localStorage.removeItem('loggedIn');
    localStorage.removeItem('aid');
    localStorage.removeItem('username');
    $state.go('login');
  };
});

app.controller('NewPostCtrl', function($scope, $state, $ionicPopup, NewPost) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

  $scope.form = NewPost.form();

  $scope.post = function() {
    NewPost.post(localStorage.aid).then(function(res) {
      if (res.data.err) {
        $ionicPopup.alert({
          template: res.data.err
        });
      }

      // Post submission was successful; redirect user back to Home tab
      $ionicPopup.alert({
        template: res.data.msg
      });
      $state.go('tabs.dash');
    }, function(err) {
      console.error(err);
      $ionicPopup.alert({
        template: 'There was an issue submitting your post. Please try again'
      });
    });
  }
});

app.controller('MyPostsCtrl', function($scope, $state, $rootScope, MyPosts) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

  $scope.myPosts;

  $scope.updatePosts = function() {
    MyPosts.myPosts(localStorage.aid).then(function(res) {
      if (res.data.err) {
        $ionicPopup.alert({
          template: res.data.err
        });
      }

      // Successfully retrieved the user's posts; update the posts displayed on
      // the My Posts tab
      MyPosts.updatePosts(res.data.posts);
      $scope.myPosts = MyPosts.posts();
    }, function(err) {
      $ionicPopup.alert({
        template: res.data.err
      });
    });
  }

  // Pull to refresh; fetch the user's posts to display them on the My Posts tab
  $scope.doRefresh = function() {
    $scope.updatePosts();
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };

  // My Posts tab only updates either on the first time the user goes to the
  // tab, or when he/she pulls to refresh. This allows the user's posts to be
  // constantly updated whenever the state switches to myposts
  $rootScope.$on('$stateChangeStart', function(event, toState) {
    if (toState.url === '/myposts') {
      $scope.updatePosts();
    }
  });

  $scope.updatePosts();
});

app.controller('MessagesCtrl', function($scope, $state, Messages) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

});

app.controller('AccountCtrl', function($scope, $state, Account) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

});