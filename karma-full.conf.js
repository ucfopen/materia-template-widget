module.exports = function(config) {
  config.set({

    autoWatch: true,

    basePath: './',

    browsers: ['PhantomJS'],

    files: [
      '../../js/*.js',
      'node_modules/angular/angular.js',
      'node_modules/angular-mocks/angular-mocks.js',
      'node_modules/angular-sanitize/angular-sanitize.js',
      'build/*.js',
      'build/modules/*.js',
      'build/controllers/*.js',
      'tests/*.js'
    ],

    frameworks: ['jasmine'],

    plugins: [
      'karma-coverage',
      'karma-eslint',
      'karma-jasmine',
      'karma-junit-reporter',
      'karma-mocha-reporter',
      'karma-phantomjs-launcher'
    ],

    preprocessors: {
      'build/modules/*.js': ['coverage', 'eslint'],
      'build/controllers/*.js': ['coverage', 'eslint'],
    },

    //plugin-specific configurations
    eslint: {
      stopOnError: true,
      stopOnWarning: false,
      showWarnings: true,
      engine: {
        configFile: '.eslintrc.json'
      }
    },

    reporters: ['coverage', 'mocha'],

    //reporter-specific configurations

    coverageReporter: {
      check: {
        global: {
          statements: 90,
          branches:   90,
          functions:  90,
          lines:      90
        },
        each: {
          statements: 90,
          branches:   90,
          functions:  90,
          lines:      90
        }
      },
      reporters: [
        { type: 'html', subdir: 'report-html' },
        { type: 'cobertura', subdir: '.', file: 'coverage.xml' }
      ]
    },

    junitReporter: {
      outputFile: './test_out/unit.xml',
      suite: 'unit'
    },

    mochaReporter: {
      output: 'autowatch'
    }

  });
};
