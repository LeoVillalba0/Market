define(['angularApp'], function(app) {
    app.controller('ResearchCenterCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
        $scope.setInt = function() {
            $interval(game.coreLoop, game.options.interval);
            log("Core loop interval set.");
        };

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.actions.angularInit();
                game.options.angularInit = true;
                $scope.setInt();
            } else {
                //game.actions.angularInit();
            };
        };

        $timeout($scope.init);
    }]);
});
