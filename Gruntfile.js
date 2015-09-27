module.exports = function(grunt) {
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    var configFilePath = 'src/assets/scripts/config/Config.ts';
    var server = grunt.option('server') || 'remote';
    if (server === 'local') {
        configFilePath = 'src/assets/scripts/config/ConfigLocal.ts'
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        BASE_PATH: '',
        DEVELOPMENT_PATH: 'src/',
        PRODUCTION_PATH: 'prod/',
        BOWER_PATH: 'bower_components/',
        MOCKS_PATH: 'src/assets/scripts/_mocks/',

        env: {
            dev: {
                NODE_ENV : 'DEVELOPMENT',
                ASSETS_ROOT: ''
            },
            prod: {
                NODE_ENV : 'PRODUCTION',
                ASSETS_ROOT: '../src/'
            }
        },

        preprocess: {
            dev: {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= DEVELOPMENT_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.version %>',
                        filePath: ''
                    }
                }
            },
            prod: {
                src : '<%= DEVELOPMENT_PATH %>' + 'config.html',
                dest : '<%= PRODUCTION_PATH %>' + 'index.html',
                options : {
                    context : {
                        appVersion : '<%= pkg.version %>',
                        filePath: ''
                    }
                }
            }
        },

        clean: {
            prod: ['<%= PRODUCTION_PATH %>'],
            temp: ['.tmp']
        },

        copy: {
            prod:  {
                files: [
                    {
                        expand: true,
                        cwd: '<%= BOWER_PATH %>bootstrap',
                        src: ['fonts/**'],
                        dest: '<%= PRODUCTION_PATH %>assets/'
                    }
                ]
            }
        },

        json: {
            web: {
                options: {
                    namespace: 'JSON_DATA',
                    includePath: false
                },
                src: ['<%= DEVELOPMENT_PATH %>' + 'assets/data/**/*.json'],
                dest:  '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/_compiled/json.js'
            }
        },

        handlebars: {
            compile: {
                options: {
                    namespace: 'JST',
                    processName: function(filePath) {
                        return filePath.slice(filePath.indexOf('template'), filePath.lastIndexOf('.'));
                    }
                },
                files: {
                    '<%= DEVELOPMENT_PATH %>assets/scripts/_compiled/templates.tmpl.js': ['<%= DEVELOPMENT_PATH %>' + 'assets/templates/**/*.hbs']
                }
            }
        },

        typescript: {
            main: {
                src: [configFilePath, '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/Application.ts'],
                dest: '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/_compiled/app.js',
                options: {
                    target: 'es5',
                    sourceMap: true,
                    declaration: false,
                    noLib: false,
                    removeComments: true
                }
            }
        },

        wiredep: {
            html: {
                src: ['<%= PRODUCTION_PATH %>' + 'index.html'],
                options: {
                    devDependencies: true
                }
            }
        },

        useminPrepare: {
            html: ['<%= PRODUCTION_PATH %>' + 'index.html'],
            options: {
                dest: '<%= PRODUCTION_PATH %>'
            }
        },

        usemin: {
            html: ['<%= PRODUCTION_PATH %>' + 'index.html']
        },

        htmlmin: {
            dist: {
                options: {
                    removeComments: true,
                    collapseWhitespace: false
                },
                files: {
                    '<%= PRODUCTION_PATH %>index.html': '<%= PRODUCTION_PATH %>' + 'index.html'
                }
            }
        },

        express: {
            dev: {
                options: {
                    port: 8000,
                    hostname: '0.0.0.0',
                    bases: ['<%= DEVELOPMENT_PATH %>', '<%= BOWER_PATH %>', '<%= MOCKS_PATH %>'],
                    livereload: true
                }
            },
            prod: {
                options: {
                    port: 8001,
                    hostname: '0.0.0.1',
                    bases: ['<%= PRODUCTION_PATH %>', '<%= MOCKS_PATH %>']
                }
            }
        },

        open: {
            dev: {
                path: 'http://localhost:<%= express.dev.options.port%>'
            },
            prod: {
                path: 'http://localhost:<%= express.prod.options.port%>'
            }
        },

        watch: {
            css: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/styles/**/*.css'
                ]
            },
            scripts: {
                options: {
                    livereload: true
                },
                files: [
                    '<%= DEVELOPMENT_PATH %>' + 'assets/scripts/**/*.ts',
                    '<%= DEVELOPMENT_PATH %>' + 'config.html',
                    '<%= DEVELOPMENT_PATH %>' + 'assets/templates/**/*.hbs'
                ],
                tasks: ['dev']
            }
        }

    });

    /**
     * Grunt tasks:
     *
     * grunt        (Builds and runs development code on development server)
     * grunt prod   (Builds and runs production code on production server)
     * grunt build  (Builds production code)
     */
    grunt.registerTask('default', [
        'server'
    ]);

    grunt.registerTask('server', [
        'dev',
        'express:dev',
        'open:dev',
        'watch'
    ]);

    grunt.registerTask('dev', [
        'env:dev',
        'preprocess:dev',
        'json',
        'handlebars',
        'typescript'
    ]);

    grunt.registerTask('prod', [
        'build',
        'express:prod',
        'open:prod',
        'express-keepalive'
    ]);

    grunt.registerTask('build', [
        'clean',
        'env:prod',
        'preprocess:prod',
        'wiredep',
        'json',
        'handlebars',
        'typescript',
        'copy',
        'useminPrepare', 'concat:generated', 'uglify:generated', 'cssmin:generated',
        'usemin',
        'htmlmin'
    ]);
};