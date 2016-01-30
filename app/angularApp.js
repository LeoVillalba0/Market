define(['angularAMD', 'angular-route'], function(angularAMD) {
    var app = angular.module("webapp", ['ngRoute']);

    app.config(function($routeProvider) {
        $routeProvider
            .when("/", angularAMD.route({
                templateUrl: 'app/templates/actions.html',
                controller: 'ActionsCtrl',
                controllerUrl: 'app/controllers-optimized/actions'
            }))
            .when('/production', angularAMD.route({
                templateUrl: 'app/templates/production.html',
                controller: 'ProductionCtrl',
                controllerUrl: 'app/controllers-optimized/production'
            }))
            .when('/gangs', angularAMD.route({
                templateUrl: 'app/templates/gangs.html',
                controller: 'GangsCtrl',
                controllerUrl: 'app/controllers-optimized/gangs'
            }))
            .when('/research-center', angularAMD.route({
                templateUrl: 'app/templates/research-center.html',
                controller: 'ResearchCenterCtrl',
                controllerUrl: 'app/controllers-optimized/research-center'
            }))
            .when('/collections', angularAMD.route({
                templateUrl: 'app/templates/collections.html',
                controller: 'CollectionsCtrl',
                controllerUrl: 'app/controllers-optimized/collections'
            }))
            .when('/prestige', angularAMD.route({
                templateUrl: 'app/templates/prestige.html',
                controller: 'PrestigeCtrl',
                controllerUrl: 'app/controllers-optimized/prestige'
            }))
            .when('/achievements', angularAMD.route({
                templateUrl: 'app/templates/achievements.html',
                controller: 'AchievementsCtrl',
                controllerUrl: 'app/controllers-optimized/achievements'
            }))
            .when('/options', angularAMD.route({
                templateUrl: 'app/templates/options.html',
                controller: 'OptionsCtrl',
                controllerUrl: 'app/controllers-optimized/options'
            }))
            .when('/help', angularAMD.route({
                templateUrl: 'app/templates/help.html',
                controller: 'HelpCtrl',
                controllerUrl: 'app/controllers-optimized/help'
            }))
            .when('/notes', angularAMD.route({
                templateUrl: 'app/templates/notes.html',
                controller: 'NotesCtrl',
                controllerUrl: 'app/controllers-optimized/notes'
            }))
            .otherwise({
                redirectTo: "/404",
                templateUrl: 'app/templates/404.html'
            });
    });

    return angularAMD.bootstrap(app);
});
