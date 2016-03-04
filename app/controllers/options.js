define(['angularApp'], function(app) {
    app.controller('OptionsCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.actions.angularInit();
                game.options.angularInit = true;
            };
        };

        $timeout($scope.init);
    }]);
});
