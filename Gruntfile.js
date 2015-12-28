module.exports = function(grunt) {
  grunt.initConfig({

    ngAnnotate: {
      app1: {
        files: {
          'js/app.js': ['js/app.js'],
          'js/imdbService.js' : ['js/imdbService.js']
        }
      }
    },
    copy: {
      main: {
        files: [
          {expand:true, src:['css/*.min.css'], dest: 'build/'},
          {expand:true, src:['fonts/*'], dest: 'build/'},
          {expand:true, src:['images/*'], dest: 'build/'},
          {expand:true, src:['js/*.min.js*'], dest: 'build/'}
        ]
      }
    },
    concat: {
      js: {
        src: ['js/app.js', 'js/imdbService.js'] ,
        dest: 'build/js/app.js'
      }
    },
    uglify: {
      js: {
        src: 'build/js/app.js',
        dest: 'build/js/app.js'
      }
    },
    htmlmin: {
      build: {
        options: {
          removeComments: true,
          collapseWhitespace: true
        },
        files: {
          'build/partials/main-info.html': 'partials/main-info.html',
          'build/partials/related-results.html': 'partials/related-results.html'
        }
      }
    },
    cssmin: {
      target: {
        files: [{
          expand: true,
          src: ['css/*.css', '!css/*.min.css'],
          dest: 'build/'
        }]
      }
    },
    jshint: {
      all: {
        src: ['js/app.js', 'js/imdbService.js']
      }
    },
    csslint: {
      all: {
        src: 'css/style.css'
      }
    }
  });

  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-csslint');
  grunt.loadNpmTasks('grunt-ng-annotate');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-htmlmin');
  grunt.loadNpmTasks('grunt-contrib-cssmin');

  grunt.registerTask('default', ['copy', 'concat', 'uglify', 'htmlmin', 'cssmin']);
  grunt.registerTask('lint', ['jshint', 'csslint']);
};
