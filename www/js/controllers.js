var app = angular.module('ratsValidator.controllers', []);

app.controller('DashCtrl', function($scope, $state) {
  if (!localStorage.loggedIn) {
    $state.go('login');
  }

  $scope.doRefresh = function() {
    // here refresh data code
    $scope.$broadcast('scroll.refreshComplete');
    $scope.$apply()
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
    }, function(err) {
      console.log(err);
    });

    localStorage.loggedIn = 'true';
    console.log(localStorage.loggedIn);
    $state.go('tabs.dash');
  };

  $scope.signup = function() {
    Entry.signup().then(function(res) {
      console.log(res);
    }, function(err) {
      console.log(err);
    });

    $state.go('login');
  };

  $scope.$on('logout', function() {
    console.log('lkasjda');
  })

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