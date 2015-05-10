'use strict';

var gulp = require('gulp'),
    jshint = require('gulp-jshint'),
    source = require('vinyl-source-stream'),
    browserify = require('browserify'),
    concat = require('gulp-concat'),
    sass = require('gulp-sass'),
    uglify = require('gulp-uglify'),
    autoprefixer = require('gulp-autoprefixer'),
    refresh = require('gulp-livereload'),
    nodemon = require('gulp-nodemon');

var expressServer = require('./server');
gulp.task('serve_', function() {
  console.log('Server');
  expressServer.startServer();
});

gulp.task('serve', function () {
  nodemon({ script: 'server.js', ext: 'json js', ignore: ['public/*', 'client/*'] })
  .on('change', ['lint'])
  .on('restart', function () {
    console.log('Restarted webserver')
  });
});

// Dev task
gulp.task('dev', ['views', 'styles', 'lint', 'browserify', 'watch', 'contact-js', 'fonts'], function() {});

// JSLint task
gulp.task('lint', function() {
  gulp.src('client/scripts/*.js')
  .pipe(jshint())
  .pipe(jshint.reporter('default'));
});

// Styles task
gulp.task('styles', function() {
  gulp.src('client/styles/*.scss')
  // The onerror handler prevents Gulp from crashing when you make a mistake in your SASS
  .pipe(sass({onError: function(e) { console.log(e); } }))
  // Optionally add autoprefixer
  .pipe(autoprefixer('last 2 versions', '> 1%', 'ie 8'))
  // These last two should look familiar now :)
  .pipe(gulp.dest('public/css/'));
  // lumx
  gulp.src([
    'bower_components/lumx/dist/lumx.css'
  ])
  // And put it in the public folder
  .pipe(gulp.dest('public/css/'));
});



// Browserify task
gulp.task('browserify', function() {
  /*var bundleStream = browserify({
    entries: ['./client/scripts/main.js'],
    debug: false,
    bundleExternal: false
  }).bundle().pipe(source('core.js'));
  return bundleStream.pipe(gulp.dest('./public/js'));*/
});

// Views task
gulp.task('views', function() {

  // Get our index.html
  gulp.src([
    'client/index.html'
  ])
  .pipe(gulp.dest('public/'));

  // Any other view files from client/views
  gulp.src([
    'client/views/**/*',
    'client/components/**/*'
  ])
  .pipe(gulp.dest('public/views/'));
  
});

gulp.task('watch', ['serve', 'lint'], function() {
  // Start live reload server
  refresh.listen();

  // Watch our scripts, and when they change run lint and browserify
  gulp.watch(['client/scripts/*.js', 'client/scripts/**/*.js'],[
    'lint',
    'contact-js'
  ]);

  // Watch our sass files
  gulp.watch(['client/styles/**/*.scss'], [
    'styles'
  ]);

  // Watch view files
  gulp.watch(['client/**/*.html'], [
    'views'
  ]);

  gulp.watch('./public/**').on('change', refresh.changed);

});

gulp.task('contact-js', function () {
    // Get our index.html
  gulp.src([
    // dependencies
    'bower_components/jquery/dist/jquery.min.js',
    'bower_components/angular/angular.js',
    'bower_components/angular-translate/angular-translate.min.js',
    'bower_components/angular-ui-router/release/angular-ui-router.min.js',
    'bower_components/angular-cookies/angular-cookies.min.js',
    'bower_components/velocity/velocity.min.js',
    'bower_components/moment/min/moment-with-locales.js',
    'bower_components/lumx/dist/lumx.js',
    // core
    './client/scripts/config.js',
    './client/scripts/module.js',
    './client/scripts/directives/**/*.js',
    './client/scripts/services/**/*.js',
    './client/scripts/controllers/**/*.js',
    './client/scripts/main.js'
  ])
  .pipe(concat('core.js'))
  //.pipe(uglify())
  // And put it in the public folder
  .pipe(gulp.dest('public/js/'));
})

gulp.task('fonts', function () {
  gulp.src([
    'bower_components/mdi/css/materialdesignicons.css'
    ]).pipe(gulp.dest('public/css/'));
  gulp.src(['bower_components/mdi/fonts/*'])
  .pipe(gulp.dest('public/fonts'));
})

gulp.task('default', ['dev']);
