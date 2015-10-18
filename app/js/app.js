var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/templates/actions.html',
			controller: 'ActionsCtrl'
		})
		.otherwise({
			redirectTo: '/'
		});
});

app.controller('ActionsCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.actions.angularInit !== true || game.actions == undefined) {
			game.actions.init();
			$interval(game.options.coreLoop, game.options.interval);
			game.actions.angularInit = true;
		} else {
			game.actions.angularDisplay();
		};
	};
}]);
