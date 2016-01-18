module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        shell: {
            dist: {
                command: [
                    'r.js.cmd -o app/build-controllers.js',
                    'r.js.cmd -o app/build-game.js',
                    'r.js.cmd -o app/build-misc.js'
                ].join('&&')
            }
        }
    });

    grunt.registerTask('default', ['shell']);
};
