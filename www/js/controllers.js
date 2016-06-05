var app = angular.module('ratsValidator.controllers', []);

app.controller('DashCtrl', function($scope, $state, $ionicPopup, Dash) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

  $scope.posts;
  Dash.recentPosts().then(function(res) {
    if (res.data.err) {
      $ionicPopup.alert({
        template: res.data.err
      });
    }

    // _.each(res.data.posts, function(post) {
    //   Dash.addPost(post);
    // });

    Dash.updatePosts(res.data.posts);

    $scope.posts = Dash.posts();
  }, function(err) {
    $ionicPopup.alert({
      template: res.data.err
    });
  });

  // Pull to refresh; fetch the most recent posts to display on the dash tab
  $scope.doRefresh = function() {
    Dash.recentPosts().then(function(res) {
      if (res.data.err) {
        $ionicPopup.alert({
          template: res.data.err
        });
      }

      $scope.posts = Dash.posts();
    }, function(err) {

    });

    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };
});

app.controller('LoginCtrl', function($scope, $state, $ionicPopup, Entry) {
  if (localStorage.loggedIn) {
    $state.go('tabs.dash');
  }

  Entry.resetForm();
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

      // User successfully logged in
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

      // Signup was successful; return to login
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
    localStorage.removeItem('uid');
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

      $ionicPopup.alert({
        template: res.data.msg
      });
    }, function(err) {
      console.error(err);
      $ionicPopup.alert({
        template: 'There was an issue submitting your post. Please try again'
      });
    });
  }
});

app.controller('MyPostsCtrl', function($scope, $state, MyPosts) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

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