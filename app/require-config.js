requirejs.config({
    baseUrl: '',
    paths: {
        'angular': 'lib/angular/js/angular.min',
        'angular-route': 'lib/angular-route/js/angular-route.min',
        'angularAMD': 'lib/angularAMD/js/angularAMD.min',
        'jquery': 'lib/jquery/js/jquery.min',

        'require-css': 'app/misc-js/require-css',
        'sidebar': 'app/misc-js/sidebar',
        'angularApp': 'app/angularApp'
    },

    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    deps: ['angularApp', 'jquery', 'require-css', 'sidebar']
});
