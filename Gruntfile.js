'use strict';

module.exports = function(grunt) {
    var sourceFiles = [
        '*.js',
        'bin/*.js',
        'app/**/*.js'
    ];
    grunt.initConfig({
        jshint: {
            files: sourceFiles,
            options: {
                // use closest-through-parent jshint configuration file
                jshintrc: true
            }
        },
        jscs: {
            src: sourceFiles,
            options: {
                config: '.jscsrc',
                maxErrors: 500
            }
        }
    });
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-jscs');
    grunt.registerTask('default', ['jshint', 'jscs']);
};
