var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {templateUrl: 'app/templates/index.html'})
		.otherwise({redirectTo: '/'});
});
