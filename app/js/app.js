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
		.when('/prestige', {
			templateUrl: 'app/templates/prestige.html',
			controller: 'PrestigeCtrl'
		})
		.when('/achievements', {
			templateUrl: 'app/templates/achievements.html',
			controller: 'AchievementsCtrl'
		})
		.when('/options', {
			templateUrl: 'app/templates/options.html',
			controller: 'OptionsCtrl'
		})
		.when('/notes', {
			templateUrl: 'app/templates/notes.html',
			controller: 'NotesCtrl'
		})
		.when('/kongregate', {
			templateUrl: 'app/templates/kongregate.html',
			controller: 'KongregateCtrl'
		})
		.when('/help', {
			templateUrl: 'app/templates/help.html',
			controller: 'HelpCtrl'
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
		$interval(submitScore, 60000);
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
		$interval(submitScore, 60000);
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
		$interval(submitScore, 60000);
	};
}]);

app.controller('PrestigeCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			game.prestige.angularDisplay();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
		$interval(submitScore, 60000);
	};
}]);

app.controller('AchievementsCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			game.achievements.angularDisplay();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
		$interval(submitScore, 60000);
	};
}]);

app.controller('OptionsCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
		$interval(submitScore, 60000);
	};
}]);

app.controller('NotesCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
		$interval(submitScore, 60000);
	};
}]);

app.controller('HelpCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			game.help.angularDisplay();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
		$interval(submitScore, 60000);
	};
}]);

app.controller('KongregateCtrl', ['$scope', '$interval', function($scope, $interval) {
	$scope.init = function() {
		if (game.options.angularInit !== true || game == undefined) {
			game.options.init();
			game.options.angularInit = true;
		} else {
			kongAngular();
		};
	};

	$scope.setInt = function() {
		$interval(game.options.coreLoop, game.options.interval);
		$interval(submitScore, 60000);
	};
}]);
