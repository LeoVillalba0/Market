define(['angularApp'], function(app) {
    app.controller('PrestigeCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.options.angularInit = true;
            };
            game.prestige.angularInit();
        };

        $timeout($scope.init);
    }]);
});
