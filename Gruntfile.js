module.exports = function (grunt) {

    "use strict";

    // Project configuration.
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yuidoc: {
            compile: {
                name: '<%= pkg.name %>',
                description: '<%= pkg.description %>',
                version: '<%= pkg.version %>',
                options: {
                    paths: 'js',
                    outdir: 'docs'
                }
            }
        },
        qunit: {
            compile: ['test/**/*.html']
        },
        concat: {
            compile: {
                files: {
                    'js/core.js': ['js/jquery-2.0.2.min.js',
                        'js/jquery.mobile-1.4.2.min.js',
                        'js/map.js', 'js/sidebar.js']
                }
            }
        },
        uglify: {
            compile: {
                files: {
                    'js/core.min.js': ['js/core.js']
                }
            }
        },
        clean: ['docs', 'js/core*.js']
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['yuidoc', 'concat', 'uglify', 'qunit']);
};
