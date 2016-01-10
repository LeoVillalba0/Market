module.exports = function(grunt) {
    grunt.loadNpmTasks('grunt-shell');
    
    grunt.initConfig({
        shell: {
            buildGame: {
                command: 'r.js.cmd -o app/build-game.js'
            },

            buildMisc: {
                command: 'r.js.cmd -o app/build-misc.js'
            },

            buildControllers: {
                command: 'r.js.cmd -o app/build-controllers.js'
            }
        }
    });

    grunt.registerTask('default', ['shell']);
};
