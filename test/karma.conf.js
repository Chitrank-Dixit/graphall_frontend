// Karma configuration
// http://karma-runner.github.io/0.12/config/configuration-file.html
// Generated on 2014-07-31 using
// generator-karma 0.8.3

module.exports = function(config) {
  'use strict';

  //var urlRoot = '/_karma_/';
  config.set({
    // enable / disable watching file and executing tests whenever any file changes
    autoWatch: true,

    // base path, that will be used to resolve files and exclude
    basePath: '../',

    // testing framework to use (jasmine/mocha/qunit/...)
    frameworks: ['jasmine'],

    // list of files / patterns to load in the browser
    files: [
      'bower_components/jquery/dist/jquery.js',
      'bower_components/angular/angular.js',
      'bower_components/angular-animate/angular-animate.js',
      'bower_components/angular-cookies/angular-cookies.js',
      'bower_components/angular-resource/angular-resource.js',
      'bower_components/angular-route/angular-route.js',
      'bower_components/angular-touch/angular-touch.js',
      'bower_components/angular-messages/angular-messages.js',
      'bower_components/angular-fontawesome/dist/angular-fontawesome.js',
      'bower_components/angular-bootstrap/ui-bootstrap.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-ui-utils/ui-utils.js',
      'bower_components/angular-loading-bar/src/loading-bar.js',
      'bower_components/angular-momentjs/angular-momentjs.js',
      'bower_components/angular-fullscreen/src/angular-fullscreen.js',
      'bower_components/angular-ui-router/release/angular-ui-router.js',
      'bower_components/angular-toastr/dist/angular-toastr.js',
      'bower_components/angular-bootstrap-nav-tree/dist/abn_tree_directive.js',
      'bower_components/oclazyload/dist/ocLazyLoad.js',
      'bower_components/angular-ui-select/dist/select.js',
      'bower_components/angular-ui-tree/dist/angular-ui-tree.js',
      'bower_components/textAngular/dist/textAngular.js',
      'bower_components/textAngular/dist/textAngularSetup.js',
      'bower_components/textAngular/dist/textAngular-sanitize.js',
      'bower_components/rangy/rangy-core.js',
      'bower_components/rangy/rangy-selectionsaverestore.js',
      'bower_components/angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.min.js',
      'bower_components/angular-file-upload/dist/angular-file-upload.min.js',
      'bower_components/ngImgCrop/compile/minified/ng-img-crop.js',
      'bower_components/datatables/media/js/jquery.dataTables.js',
      'bower_components/angular-datatables/dist/angular-datatables.min.js',
      'bower_components/angular-datatables/dist/plugins/bootstrap/angular-datatables.bootstrap.min.js',
      'bower_components/angular-datatables/dist/plugins/colreorder/angular-datatables.colreorder.min.js',
      'bower_components/angular-datatables/dist/plugins/colvis/angular-datatables.colvis.min.js',
      'bower_components/angular-datatables/dist/plugins/tabletools/angular-datatables.tabletools.min.js',
      'bower_components/angular-datatables/dist/plugins/scroller/angular-datatables.scroller.min.js',
      'bower_components/angular-datatables/dist/plugins/columnfilter/angular-datatables.columnfilter.min.js',
      'bower_components/angular-ui-grid/ui-grid.min.js',
      'bower_components/ng-table/dist/ng-table.min.js',
      'bower_components/angular-smart-table/dist/smart-table.min.js',
      'bower_components/angular-flot/angular-flot.js',
      'bower_components/angular-rickshaw/rickshaw.js',
      'bower_components/jquery.easy-pie-chart/dist/angular.easypiechart.min.js',
      'bower_components/angular-google-maps/dist/angular-google-maps.js',
      'bower_components/angular-simple-logger/dist/angular-simple-logger.min.js',
      'bower_components/angular-ui-calendar/src/calendar.js',
      'bower_components/ng-tags-input/ng-tags-input.min.js',
      'bower_components/angular-material/angular-material.min.js',
      'bower_components/angular-aria/angular-aria.min.js',
      'bower_components/angular-chosen-localytics/chosen.js',
      'bower_components/angular-leaflet-directive/dist/angular-leaflet-directive.min.js',
      'bower_components/angular-masonry/angular-masonry.js',
      'bower_components/angular-ipsum/dist/ipsum.min.js',
      'bower_components/angular-intro.js/build/angular-intro.min.js',
      'bower_components/dragular/dist/dragular.min.js',
      'bower_components/angular-translate/angular-translate.js',
      'bower_components/angular-translate-storage-local/angular-translate-storage-local.min.js',
      'bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js',
      'bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js',
      'bower_components/angular-mocks/angular-mocks.js',
      'app/scripts/app.js',
      'app/scripts/directives/lazymodel.js',
      'app/scripts/controllers/ui-alerts.js',
      'app/scripts/controllers/main.js',
      ////'app/scripts/**/*.js',  //this would be done afterwards
      ////'test/mock/**/*.js',
      //// 'test/spec/**/*.js'    //this would be done afterwards
      'test/spec/controllers/main.js'
    ],

    // list of files / patterns to exclude
    exclude: [],

    // web server port
    port: 9001,


    // Start these browsers, currently available:
    // - Chrome
    // - ChromeCanary
    // - Firefox
    // - Opera
    // - Safari (only Mac)
    // - PhantomJS
    // - IE (only Windows)
    browsers: [
      'PhantomJS'
    ],

    // Which plugins to enable
    plugins: [
      'karma-phantomjs-launcher',
      'karma-chrome-launcher',
      'karma-jasmine'
    ],

    // Continuous Integration mode
    // if true, it capture browsers, run tests and exit
    singleRun: false,

    colors: true,

    // level of logging
    // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
    logLevel: config.LOG_INFO,

    // Uncomment the following lines if you are using grunt's server to run the tests
    // proxies: {
    //   '/': 'http://localhost:9000/'
    // },
    // URL root prevent conflicts with the site root
    // urlRoot: '_karma_'
  });
};
