var app = angular.module('ratsValidator.controllers', []);

app.controller('DashCtrl', function($scope) {
	$scope.doRefresh = function() {
   // here refresh data code
	   $scope.$broadcast('scroll.refreshComplete');
	   $scope.$apply()
	};
});
app.controller('newPostCtrl', function($scope) {});