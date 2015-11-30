define(['angularApp'], function(app) {
    app.controller('ActionsCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
        $scope.actions = {
            action: game.actions.list,
        };

        $scope.setInt = function() {
            $interval(game.coreLoop, game.options.interval);
            log("Core loop interval set.");
        };

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.options.angularInit = true;
                $scope.setInt();
            };
            game.actions.angularInit();
        };

        $timeout($scope.init);
    }]);
});
