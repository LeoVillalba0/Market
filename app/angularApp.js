define(['angularAMD', 'angular-route'], function(angularAMD) {
    var app = angular.module("webapp", ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/home", angularAMD.route({
                templateUrl: 'app/templates/view_home.html',
                controller: 'HomeCtrl',
                controllerUrl: 'app/controllers/controller_home'
            }))
            .when("/view1", angularAMD.route({
                templateUrl: 'app/templates/view_view1.html',
                controller: 'View1Ctrl',
                controllerUrl: 'app/controllers/controller_view1'
            }))
            .otherwise({
                redirectTo: "/home"
            });
    });

    return angularAMD.bootstrap(app);
});
