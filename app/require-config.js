requirejs.config({
    waitSeconds: 0,
    baseUrl: '',
    paths: {
        'angular': 'lib/angular/js/angular.min',
        'angular-route': 'lib/angular-route/js/angular-route.min',
        'angularAMD': 'lib/angularAMD/js/angularAMD.min',

        'require-css': 'app/misc-js/require-css',
        'sidebar': 'app/misc-js/sidebar',
        'beautify': 'app/misc-js/beautify',
        'notify': 'app/misc-js/notify',
        'angularApp': 'app/angularApp',

        'core': 'app/game/core',
        'actions': 'app/game/actions',
        'research-center': 'app/game/research-center',
        'achievements': 'app/game/achievements',
        'production': 'app/game/production'
    },

    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    deps: ['angularApp', 'core']
});
