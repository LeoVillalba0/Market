var isDev = false;

if (isDev) {
    requirejs.config({
        waitSeconds: 0,
        baseUrl: '',

        paths: {
            'angular': 'lib/angular/js/angular.min',
            'angular-route': 'lib/angular-route/js/angular-route.min',
            'angularAMD': 'lib/angularAMD/js/angularAMD.min',
            'bootstrap': 'lib/bootswatch-dist/js/bootstrap.min',

            'angularApp': 'app/angularApp',

            'require-css': 'app/misc-js/require-css',
            'sidebar': 'app/misc-js/sidebar',
            'beautify': 'app/misc-js/beautify',
            'notify': 'app/misc-js/notify',

            'core': 'app/game/core',
            'actions': 'app/game/actions',
            'research-center': 'app/game/research-center',
            'achievements': 'app/game/achievements',
            'production': 'app/game/production',
            'prestige': 'app/game/prestige',
            'gangs': 'app/game/gangs',
            'collections': 'app/game/collections',
            'save': 'app/game/save'
        },

        shim: {
            'angularAMD': ['angular'],
            'angular-route': ['angular']
        },

        deps: ['angularApp', 'core']
    });
} else {
    requirejs.config({
        waitSeconds: 0,
        baseUrl: '',

        paths: {
            'angular': 'lib/angular/js/angular.min',
            'angular-route': 'lib/angular-route/js/angular-route.min',
            'angularAMD': 'lib/angularAMD/js/angularAMD.min',
            'bootstrap': 'lib/bootswatch-dist/js/bootstrap.min',

            'angularApp': 'app/angularApp',

            'require-css': 'app/misc-js-optimized/require-css',
            'sidebar': 'app/misc-js-optimized/sidebar',
            'beautify': 'app/misc-js-optimized/beautify',
            'notify': 'app/misc-js-optimized/notify',

            'core': 'app/game-optimized/core',
            'actions': 'app/game-optimized/actions',
            'research-center': 'app/game-optimized/research-center',
            'achievements': 'app/game-optimized/achievements',
            'production': 'app/game-optimized/production',
            'prestige': 'app/game-optimized/prestige',
            'gangs': 'app/game-optimized/gangs',
            'collections': 'app/game-optimized/collections',
            'save': 'app/game-optimized/save'
        },

        shim: {
            'angularAMD': ['angular'],
            'angular-route': ['angular']
        },

        deps: ['angularApp', 'core']
    });
};
