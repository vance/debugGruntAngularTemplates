module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),

    jshint: {
      all: {
        src: ['src/main/app/**/*.js', 'src/main/commons/**/*.js', 'test/specs']
      },
      options: {
        "curly": true,
        "eqeqeq": true,
        "forin": true,
        "immed": true,
        "indent": 4,
        "latedef": true,
        "newcap": true,
        "noarg": true,
        "noempty": true,
        "nonew": true,
        "quotmark": true,
        "sub": true,
        "undef": true,
        "unused": true,
        "strict": true,
        "trailing": true,
        "maxdepth": 3,
        "maxcomplexity": 7,
        "boss": false,
        "eqnull": false,
        "browser": true,
        "globals": {
          "Class": false,
          "app": true,
          "alert": false,
          "now": false,
          "console": false,
          "app_console": false,
          "d3": false,
          "dimple": false,
          "$": false,
          "_": false,
          "Debug": false,
          "jQuery": true,
          "jasmine": true,
          "define": true,
          "describe": true,
          "inject": true,
          "beforeEach": true,
          "afterEach": true,
          "expect": true,
          "it": true,
          "angular": true,
          "module": true
        }
      }
    },

    compass: {
      dist: {
        options: {
          basePath: 'src/main',
          imagesDir: 'resources/img',
          fontsDir: 'fonts',
          javascriptsDir: 'resources/js',
          httpPath: '/',
          relativeAssets: true,
          sassDir: 'scss',
          cssDir: 'resources/css',
          specify: 'src/main/scss/screen.scss',
          environment: 'production', // 'production' 'development'
          outputStyle: 'compressed'
        }
      }
    },

    watch: {
      scss: {
        files: ['src/**/*.scss'],
        tasks: ['compass']
      },
      pivotal: {
        files: ['src/main/app/**/*.js', 'test/specs/**/*.js'],
        tasks: ['connect', 'jasmine', 'jshint']
      },

      express: {
           files:  [ 'scaffold/**/*.js', 'src/main/**/*.js' ],
           tasks:  [ 'express:dev' ],
           options: {
              spawn: false // for grunt-contrib-watch v0.5.0+, "nospawn: true" for lower versions. Without this option specified express won't be reloaded
           }
      }
    },

    connect: {
      test: {
        port: 8000
      }
    },


    // this is for standalone jasmine in the browser
    // we generate the template
    jasmine: {

      src: ['./src/main/app/**/*.js','./src/main/commons/**/*.js'],
      options: {
        keepRunner: true,
        build: true,
        vendor: [
          'src/main/resources/lib/angular-1.2.16/angular.js',
          'src/main/resources/lib/angular-1.2.16/angular-mocks.js',
          'src/main/resources/lib/angular-1.2.16/angular-resource.js',
          'src/main/resources/lib/angular-1.2.16/angular-route.js',
          'src/main/resources/lib/debugger/renderjson.js',
          'src/main/resources/lib/debugger/dimple.v1.1.2.min.js',
          'src/main/resources/lib/angular-1.2.16/angular-scenario',
            'src/main/app/templates.js'
        ],

        specs: 'test/specs/**/*.Spec.js',
        helpers: 'src/**/*.Helper.js',
        host: 'http://127.0.0.1:8000/',
        template: require('grunt-template-jasmine-requirejs'),
        templateOptions: {
          requireConfig: {
            baseUrl: '.grunt/grunt-contrib-jasmine/',
            paths: {
              // External libraries
              'angular': 'src/main/resources/lib/angular-1.2.16/angular',
              'angularMocks': 'src/main/resources/lib/angular-1.2.16/angular-mocks',
              'angularResource':'src/main/resources/lib/angular-1.2.16/angular-resource',
              'angularRoute':'src/main/resources/lib/angular-1.2.16/angular-route',
              'angularScenario':'src/main/resources/lib/angular-1.2.16/angular-scenario'
            },
            shim: {
              'angular': {
                'exports': 'angular'
              },

              'angular-ui.utils': {
                deps: ['angular']
              },
              'angularMocks': {
                deps: ['angular'],
                'exports': 'angular.mock'
              },
              'angularResource': {
                deps: ['angular'],
                'exports': 'angular.resource'
              },
              'angularRoute': {
                 deps: ['angular'],
                 'exports': 'angular.router'
              },
              'angularScenario': {
                 deps: ['angular'],
                 'exports': 'angular.scenario'
              },

//              unfortunately we need to explicitly include the templates
//              'src/main/app/components/nav/navigation.html': {
//                deps: ['angular']
//              }

            }
          }
        }
      }
    },

    'jasmine-server': {
      browser: true
    },

    // use go to disable constant file watching and run it like the pipeline
    // grunt karma:go
    karma: {
      background: false,
      logLevel: 'debug',
      options: {
        basePath: '',
        // files for karma to host
        files: [
          // we can't do them all because it breaks
          {pattern: 'src/main/resources/lib/angular-1.2.16/angular.js',included: true},
          {pattern: 'src/main/resources/lib/angular-1.2.16/angular-mocks.js',included: true},
          {pattern: 'src/main/resources/lib/angular-1.2.16/angular-resource.js',included: true},
          {pattern: 'src/main/resources/lib/angular-1.2.16/angular-route.js',included: true},

          //bake down the templates
          {pattern:'src/main/app/templates.js', included: true},

          {pattern:'src/main/**/*.html', included: false},

          //{pattern:'lib/angular-1.2.16/**/angular*.js', included: true},

          {pattern: 'src/main/app/**/*.js', included: true},
          {pattern: 'src/main/commons/**/*.js', included: true},

          {pattern: 'test/specs/**/*.Spec.js', included: false,watched: true},
          {pattern: 'test/KarmaSpecRunner.js', included: true}
        ],
        exclude: [
          'lib/angular-1.2.16/docs/**/*.*',
          'lib/angular-1.2.16/**/*min.js',
        ],
        plugins: [
          "karma-jasmine",
          "karma-phantomjs-launcher",
          "karma-requirejs",
          'karma-chrome-launcher',
          'karma-coverage'
        ],
        frameworks: [
          "jasmine",
          "requirejs"
        ],
        browsers: [
          "PhantomJS"
          //"Chrome"
        ],
        preprocessors: {
          'src/js/**/*.js': ['coverage']
        },
        coverageReporter: {
          type: 'lcov',
          dir: 'test/coverage/'
        },
        reporters: [
          'dots',
          'coverage'
        ]
      },
      go: {
        singleRun: true
      }
    },

    ngtemplates:  {
      SomePublicApp:        {
          cwd:      '',
          src:      'src/main/app/**/**.html',
          dest:     'src/main/app/templates.js'
      }
    },

    coverage: {
      options: {
        thresholds: {
          'statements': 90,
          'branches': 90,
          'lines': 90,
          'functions': 90
        },
        dir: '',
        root: 'test'
      }
    },

    express: {
      options: {
        // Override defaults here
      },
      dev: {
        options: {
          script: 'scaffold/server.js'
        }
      }
    },

    replace: {
      minify: {
        src: ['src/index.html'], // source files array (supports minimatch)
        dest: 'src/index_min.html', // destination directory or file
        replacements: [{
          from: 'main/app', // string replacement
          to: 'minified/app'
        }, {
          from: 'main/commons',
          to: 'minified/commons'
        }]
      }
    },

    uglify: {
      my_target: {
        options: {
          sourceMap: true
        },
        files: [{
          expand: true,
          cwd: 'src/main/',
          src: ['app/**/*.js', 'commons/**/*.js'],
          dest: 'src/minified/'
        }]
      }
    }

  });



  grunt.loadNpmTasks('grunt-contrib-compass');
  grunt.loadNpmTasks("grunt-contrib-watch");
  grunt.loadNpmTasks("grunt-contrib-jshint");
  grunt.loadNpmTasks('grunt-karma');
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-jasmine');
  grunt.loadNpmTasks('grunt-express-server');
  grunt.loadNpmTasks('grunt-angular-templates');

  // minification tasks
  grunt.loadNpmTasks('grunt-contrib-uglify');
  grunt.loadNpmTasks('grunt-text-replace');


  // Default task.
  grunt.registerTask('default', ['watch']);

  grunt.registerTask('runJasmine', ['connect', 'jasmine']);

  grunt.registerTask('unit', ['jshint', 'connect', 'ngtemplates', 'karma:go']);

  // bake the html templates into a js file and register with $templateCache
  grunt.registerTask('ngTemplate', ['connect', 'ngtemplates', 'karma:go']);


  grunt.registerTask('makeSpec', ['jasmine:generate']);
  // For coverage, do karma:go so that it terminates

  grunt.registerTask('server', ['express:dev']);

  grunt.registerTask('minify', ['uglify', 'replace']);


};