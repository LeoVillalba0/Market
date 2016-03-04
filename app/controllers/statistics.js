define(['angularApp'], function(app) {
    app.controller('StatisticsCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.actions.angularInit();
                game.options.angularInit = true;
            };
            game.statistics.angularInit();
        };

        $timeout($scope.init);
    }]);
});
