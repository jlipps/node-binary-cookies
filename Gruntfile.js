"use strict";

module.exports = function(grunt) {
  grunt.initConfig({
    jshint: {
      all: ['*.js', 'test/*.js']
      , options: {
        laxcomma: true
        , es5: true
        , trailing: true
        , node: true
        , strict: true
      }
    }
    , mochaTest: {
      unit: ['test/*.js']
    }
    , mochaTestConfig: {
      options: {
        timeout: 10000,
        reporter: 'spec'
      }
    }
  });

  grunt.loadNpmTasks('grunt-mocha-test');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.registerTask('lint', ['jshint']);
  grunt.registerTask('test', ['jshint', 'mochaTest:unit']);
  grunt.registerTask('unit', 'mochaTest:unit');
  grunt.registerTask('default', ['test']);
};

