define(['angularApp'], function(app) {
    app.controller('GangsCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.options.angularInit = true;
            };
            game.gangs.angularInit();
        };

        $timeout($scope.init);
    }]);
});
