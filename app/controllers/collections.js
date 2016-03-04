define(['angularApp'], function(app) {
    app.controller('CollectionsCtrl', ['$scope', '$interval', '$timeout', function($scope, $interval, $timeout) {

        $scope.init = function() {
            if (!game.options.angularInit) {
                game.actions.angularInit();
                game.options.angularInit = true;
            };
            game.collections.angularInit();
        };

        $timeout($scope.init);

    }]);
});
