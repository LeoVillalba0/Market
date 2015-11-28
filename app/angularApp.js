define(['angularAMD', 'angular-route'], function(angularAMD) {
    var app = angular.module("webapp", ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: 'app/templates/actions.html',
                controller: 'ActionsCtrl',
                controllerUrl: 'app/controllers/actions'
            }))
            .otherwise({
                redirectTo: "/404",
                templateUrl: 'app/templates/404.html'
            });
    });

    return angularAMD.bootstrap(app);
});
