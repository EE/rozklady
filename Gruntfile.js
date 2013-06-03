/* jshint node: true */
module.exports = function (grunt) {
    'use strict';

    var mountFolder = function (connect, dir) {
        return connect.static(require('path').resolve(dir));
    };

    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    grunt.initConfig({
        watch: {
            compass: {
                files: ['app/styles/{,*/}*.{scss,sass}'],
                tasks: ['compass']
            },
        },
        connect: {
            options: {
                port: 9000,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc',
                ignores: ['app/js/vendor/**'],
            },
            all: [
                'Gruntfile.js',
                'app/js/**/*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            }
        },
    });

    grunt.registerTask('server', [
        'open',
        'watch'
    ]);

    grunt.registerTask('test', [
        'connect:test',
        'karma'
    ]);

    grunt.registerTask('build', [
        'jshint',
        'test',
    ]);

    grunt.registerTask('default', ['build']);
};
