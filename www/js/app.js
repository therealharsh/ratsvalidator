var app = angular.module('ratsValidator', [
  'ionic',
  'ngCordova',
  'signature',
  'ratsValidator.controllers',
  'ratsValidator.services'
]);

// lodash
app.constant('_',
  window._
);

app.filter('reverse', function() {
  return function(items) {
    return items.slice().reverse();
  }
});

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
  // Place the nav-bar on the bottom of the screen for Android
  $ionicConfigProvider.tabs.position('bottom');
  // Remove the back button text so it doesn't display the previous view's name
  $ionicConfigProvider.backButton.previousTitleText(false).text('');
}]);

// Ionic uses AngularUI Router which uses the concept of states
// Learn more here: https://github.com/angular-ui/ui-router
// Set up the various states which the app can be in.
// Each state's controller can be found in controllers.js
app.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider.state('page', {
    url: '/page',
    abstract: true,
    templateUrl: 'templates/pages.html'
  })

  .state('page.dash', {
    url: '/dash',
    views: {
      'page-dash': {
        templateUrl: 'templates/dash.html',
        controller: 'DashCtrl'
      }
    }
  })

  .state('page.newPost', {
    url: '/newPost',
    views: {
      'page-newpost': {
        templateUrl: 'templates/newPost.html',
        controller: 'newPostCtrl'
      }
    }
  })

  $urlRouterProvider.otherwise('/page/dash');
});
