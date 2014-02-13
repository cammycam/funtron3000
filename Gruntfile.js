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
        uglify: {
            compile: {
                files: {
                    'js/out.min.js': ['js/*.js']
                }
            }
        },
        clean: ['docs', 'js/out.min.js']
    });

    // Load the plugins
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-qunit');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');

    // Default task(s).
    grunt.registerTask('default', ['yuidoc', 'qunit', 'uglify']);
};
