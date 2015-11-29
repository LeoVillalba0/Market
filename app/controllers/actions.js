define(['angularApp'], function(app) {
    app.controller('ActionsCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {
        $scope.actions = {
            action: ["Shooting", "Street fight", "Pickpocket", "Scam", "Steal car", "Jewelry robbery", "Hacking", "Arms sales"],
        };

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
                game.actions.angularInit();
            };
        };

        $timeout($scope.init);
    }]);
});
