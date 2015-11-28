requirejs.config({
    baseUrl: '',
    paths: {
        'angular': 'lib/angular/js/angular',
        'angular-route': 'lib/angular-route/js/angular-route',
        'angularAMD': 'lib/angularAMD/js/angularAMD.min',
        'jquery': 'lib/jquery/js/jquery',

        'require-css': 'app/require-css',
        'angularApp': 'app/angularApp'
    },

    shim: {
        'angularAMD': ['angular'],
        'angular-route': ['angular']
    },

    deps: ['angularApp', 'jquery', 'require-css']
});
