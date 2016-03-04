define(['angularApp'], function(app) {
    app.controller('ProductionCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.options.angularInit = true;
            };
            game.production.angularInit();
        };

        $timeout($scope.init);
    }]);
});
