'use strict';

var gulp = require('gulp');
var nodemon = require('gulp-nodemon');
var mocha = require('gulp-mocha');

gulp.task('default', function () {
   nodemon({ script : './index.js', ext : 'js' });
});

gulp.task('test', function() {
   process.env.NODE_ENV = "test";
   return gulp.src('test/**/*.js')
       .pipe(mocha())
});
