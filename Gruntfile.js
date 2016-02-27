module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        "jsbeautifier": {
            "all": {
                src: ["app/**/*.js"],
                options: {
                    js: {
                        indentSize: 4,
                        indentWithTabs: false,
                        endWithNewline: true,
                        keepArrayIndentation: true,
                        keepFunctionIndentation: true
                    }
                }
            }
        },

        concat: {
            options: {
                separator: '\r\n ;'
            },
            dist: {
                src: ['app/game-optimized/*.js'],
                dest: 'app/game-dist/game.js'
            }
        },

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

    grunt.registerTask('default', ['jsbeautifier:all', 'shell:dist']);
    grunt.registerTask('concat_all', ['shell:dist', 'concat:dist']);
};
