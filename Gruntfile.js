/*global module, require */
module.exports = function( grunt ) {
    'use strict';

    // Livereload and connect variables
    var LIVERELOAD_PORT = 35729;
    var lrSnippet = require('connect-livereload')({
        port: LIVERELOAD_PORT
    });
    var mountFolder = function( connect, dir ) {
        return connect.static(require('path').resolve(dir));
    };
    var mixIn = require('mout/object/mixIn');
    var requireConfig = {
        baseUrl: 'app/',
        paths: {
            'jquery': '../lib/jquery/jquery-1.9.1',
            'knockout': '../lib/knockout/knockout-2.3.0',
            'text': '../lib/require/text',
            'durandal': '../lib/durandal/js',
            'plugins': '../lib/durandal/js/plugins',
            'transitions': '../lib/durandal/js/transitions'
        }
    };

    var noDurandalConfig = {
        baseUrl: 'app/',
        paths: {
            'jquery': 'empty:',
            'knockout': 'empty:',
            'text': '../lib/require/text',
            'durandal': 'empty:',
            'plugins': 'empty:',
            'transitions': 'empty:'
        }
    };

    grunt.initConfig({
            pkg: grunt.file.readJSON('package.json'),

            clean: {
                build: ['build/*']
            },

            connect: {
                build: {
                    options: {
                        port: 9001,
                        hostname: 'localhost',
                        base: 'build'
                    }
                },
                dev: {
                    options: {
                        port: 8999,
                        hostname: 'localhost',
                        middleware: function( connect ) {
                            return [lrSnippet, mountFolder(connect, '.')];
                        }
                    }
                }
            },

            copy: {
                lib: {
                    src: 'lib/**/**',
                    dest: 'build/'
                },
                index: {
                    src: 'index.html',
                    dest: 'build/'
                },
                css: {
                    src: 'css/**',
                    dest: 'build/'
                },
                images: {
                    src: 'Images/**',
                    dest: 'build/'
                },
                config: {
                    src: 'app/config.js',
                    dest: 'build/'
                }
            },

            open: {
                dev: {
                    path: 'http://localhost:<%= connect.dev.options.port %>/_SpecRunner.html'
                },
                build: {
                    path: 'http://localhost:<%= connect.build.options.port %>'
                },
                debug: {
                    path: 'http://localhost:<%= connect.dev.options.port %>/index.html'
                }
            },

            durandal: {
                main: {
                    src: ['app/**/*.*','!app/config.js'],
                    options: {
                        name: 'rAlias',
                        baseUrl: noDurandalConfig.baseUrl,
                        mainPath: 'app/main',
                        paths: mixIn({}, noDurandalConfig.paths, {'rAlias': '../wrapStart'}),
                        exclude: ['text'],
                        out: 'build/app/main.js'
                    }
                }
            },

            jasmine: {
                dev: {
                    src: 'app/viewmodels/*.js',
                    options: {
                        specs: 'test/specs/dev/**/*spec.js',
                        keepRunner: true,
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfig: requireConfig
                        }
                    }
                },
                build: {
                    options: {
                        specs: 'test/specs/build/**/*spec.js',
                        keepRunner: true,
                        template: require('grunt-template-jasmine-requirejs'),
                        templateOptions: {
                            requireConfig: requireConfig
                        }
                    }
                }
            },

            jshint: {
                all: ['Gruntfile.js', 'app/**/*.js', 'test/specs/**/*.js']
            },

            uglify: {
                options: {
                    banner: '/*! <%= pkg.name %> <%= grunt.template.today("yyyy-mm-dd") %> \n' +
                        '* Copyright (c) <%= grunt.template.today("yyyy") %> YourName/YourCompany \n' +
                        '* Available via the MIT license.\n' +
                        '* see: http://opensource.org/licenses/MIT for blueprint.\n' +
                        '*/\n'
                },
                build: {
                    src: 'build/app/main.js',
                    dest: 'build/app/main-built.js'
                }
            },

            watch: {
                build: {
                    files: ['build/**/*.js'],
                    tasks: ['jasmine:build']
                },
                dev: {
                    files: ['test/specs/dev/**/*spec.js', 'app/**/*.js'],
                    tasks: ['jasmine:dev'],
                    options: {
                        livereload: true
                    }
                },
                debug: {
                    files: ['app/**/*.js']
                }
            }
        }
    );

// Loading plugin(s)
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-contrib-copy');
    grunt.loadNpmTasks('grunt-contrib-jasmine');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-open');
    grunt.loadNpmTasks('grunt-durandal');

    grunt.registerTask('default', ['jshint', 'jasmine:dev', 'connect:dev:livereload', 'open:dev', 'watch:dev']);

    grunt.registerTask('debug', ['connect:dev:livereload', 'open:debug','watch:debug']);

    grunt.registerTask('build', ['clean', 'copy', 'durandal:main', 'uglify', 'connect:build', 'open:build', 'watch:build']);

    grunt.registerTask('clear', ['clean']);

};
