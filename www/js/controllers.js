var app = angular.module('ratsValidator.controllers', []);

app.controller('DashCtrl', function($scope, $state) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

  $scope.doRefresh = function() {
    // here refresh data code
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply();
  };
});

app.controller('EntryCtrl', function($scope, $state, $ionicPopup, $ionicHistory,
                                     Entry) {
  if (localStorage.loggedIn) {
    $state.go('tabs.dash');
  }

  Entry.resetForm();
  $scope.form = Entry.form();

  $scope.login = function() {
    Entry.login().then(function(res) {
      if (res.data.message) {
        $ionicPopup.alert({
          template: res.data.message
        });
        return;
      }

      localStorage.loggedIn = 'true';
      $state.go('tabs.dash');
    }, function(err) {
      $ionicPopup.alert({
        template: err.data.message
      });
    });
  };

  $scope.signup = function() {
    Entry.signup().then(function(res) {
      if (res.data.message) {
        $ionicPopup.alert({
          title: 'Sign Up',
          template: res.data.message
        });
        return;
      }

      $state.go('login');
    }, function(err) {
      console.log(err.data);
    });
  };

  $scope.logout = function() {
    $ionicHistory.clearCache();
    $ionicHistory.clearHistory();
    localStorage.removeItem('loggedIn');
    $state.go('login');
  };
});

app.controller('NewPostCtrl', function($scope, $state) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

});

app.controller('MyPostsCtrl', function($scope, $state) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

});

app.controller('MessagesCtrl', function($scope, $state) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

});

app.controller('AccountCtrl', function($scope, $state) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

});