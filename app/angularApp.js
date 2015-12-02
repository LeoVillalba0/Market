define(['angularAMD', 'angular-route'], function(angularAMD) {
    var app = angular.module("webapp", ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: 'app/templates/actions.html',
                controller: 'ActionsCtrl',
                controllerUrl: 'app/controllers/actions'
            }))
            .when('/production', angularAMD.route({
                templateUrl: 'app/templates/production.html',
                controller: 'ProductionCtrl',
                controllerUrl: 'app/controllers/production'
            }))
            .when('/research-center', angularAMD.route({
                templateUrl: 'app/templates/research-center.html',
                controller: 'ResearchCenterCtrl',
                controllerUrl: 'app/controllers/research-center'
            }))
            .when('/achievements', angularAMD.route({
                templateUrl: 'app/templates/achievements.html',
                controller: 'AchievementsCtrl',
                controllerUrl: 'app/controllers/achievements'
            }))
            .when('/options', angularAMD.route({
                templateUrl: 'app/templates/options.html',
                controller: 'OptionsCtrl',
                controllerUrl: 'app/controllers/options'
            }))
            .when('/help', angularAMD.route({
                templateUrl: 'app/templates/help.html',
                controller: 'HelpCtrl',
                controllerUrl: 'app/controllers/help'
            }))
            .otherwise({
                redirectTo: "/404",
                templateUrl: 'app/templates/404.html'
            });
    });

    return angularAMD.bootstrap(app);
});
