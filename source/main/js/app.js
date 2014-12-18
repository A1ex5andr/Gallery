var app = angular.module('store', [
	'ui.router',
	'ngResource',
	'scopeTest',
	'Slides'
]);

app.controller('PageCtrl', ['$log', function ($log/* $scope, $location, $http */) {
	$log.info("Page Controller reporting on duty.");
}]);

