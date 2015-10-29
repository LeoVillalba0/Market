var app = angular.module('app', ['ngRoute']);

app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'app/templates/actions.html',
			controller: 'ActionsCtrl'
		})
		.when('/production', {
			templateUrl: 'app/templates/production.html',
			controller: 'ProductionCtrl'
		})
		.when('/upgrades', {
			templateUrl: 'app/templates/upgrades.html',
			controller: 'UpgradesCtrl'
		})
		.otherwise({
			redirectTo: '/404',
			templateUrl: 'app/templates/404.html'
		});
});

app.controller('ActionsCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			game.actions.angularDisplay();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
	};
}]);

app.controller('ProductionCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			game.production.angularDisplay();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
	};
}]);

app.controller('UpgradesCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			game.upgrades.angularDisplay();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
	};
}]);
