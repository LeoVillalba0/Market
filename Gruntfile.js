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
};
