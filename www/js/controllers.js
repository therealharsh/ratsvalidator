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

app.controller('EntryCtrl', function($scope, $state, $ionicHistory, Entry) {
  if (localStorage.loggedIn) {
    $state.go('tabs.dash');
  }

  $scope.form = Entry.form();

  $scope.login = function() {
    Entry.login().then(function(res) {
      console.log(res);
      localStorage.loggedIn = 'true';
      $state.go('tabs.dash');
    }, function(err) {
      console.log(err);
    });
  };

  $scope.signup = function() {
    Entry.signup().then(function(res) {
      console.log(res);
      $state.go('login');
    }, function(err) {
      console.log(err);
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