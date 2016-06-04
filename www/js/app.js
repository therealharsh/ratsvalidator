var app = angular.module('ratsValidator', [
  'ionic',
  'ratsValidator.controllers',
  'ratsValidator.services'
]);

// lodash
app.constant('_',
  window._
);

app.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar
    // above the keyboard for form inputs)
    if (window.cordova && window.cordova.plugins &&
      window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }

    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }
  });
});

app.config(['$ionicConfigProvider', function($ionicConfigProvider) {
  // Configuations for Android
  // $ionicConfigProvider.tabs.position('bottom');
  // $ionicConfigProvider.navBar.alignTitle('center');

  // Don't display the previous tab's name
  // $ionicConfigProvider.backButton.previousTitleText(false).text('');
}]);

// Ionic uses AngularUI Router which uses the concept of states
// Learn more here: https://github.com/angular-ui/ui-router
// Set up the various states which the app can be in.
// Each state's controller can be found in controllers.js
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider

  .state('tabs', {
    url: '/tabs',
    abstract: true,
    templateUrl: 'templates/tabs.html'
  })

  .state('login', {
    url: '/login',
    templateUrl: 'templates/login.html',
    controller: 'LoginCtrl'
  })

  .state('signup', {
    url: '/signup',
    templateUrl: 'templates/signup.html',
    controller: 'SignupCtrl'
  })

  .state('tabs.dash', {
    url: '/dash',
    views: {
      'dash': {
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('tabs.newpost', {
    url: '/newpost',
    views: {
      'newpost': {
        templateUrl: 'templates/newPost.html',
        controller: 'NewPostCtrl'
      }
    }
  })

  .state('tabs.myposts', {
    url: '/myposts',
    views: {
      'myposts': {
        templateUrl: 'templates/myposts.html',
        controller: 'MyPostsCtrl'
      }
    }
  })

  .state('tabs.messages', {
    url: '/messages',
    views: {
      'messages': {
        templateUrl: 'templates/messages.html',
        controller: 'MessagesCtrl'
      }
    }
  })

  .state('tabs.account', {
    url: '/account',
    views: {
      'account': {
        templateUrl: 'templates/account.html',
        controller: 'AccountCtrl'
      }
    }
  });

  $urlRouterProvider.otherwise('/tabs/dash');
});
