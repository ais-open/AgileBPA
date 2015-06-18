/**
 *
 */
var gulp        = require('gulp');
var babel       = require('gulp-babel');
var browserSync = require('browser-sync');
var concat      = require('gulp-concat');
var cp          = require('child_process');
var debug       = require('gulp-debug');
var fs          = require('fs');
var imagemin    = require('gulp-imagemin');
var jasmine     = require('gulp-jasmine');
var minifyCSS   = require('gulp-minify-css');
var moment      = require('moment');
var os          = require("os");
var pkg         = require('./package.json');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var rimraf      = require('rimraf');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var uncss       = require('gulp-uncss');
var wiredep     = require('wiredep').stream;


gulp.task('default', ['develop']);
gulp.task('develop', ['browser-sync', 'watch']);
gulp.task('build', ['sass', 'babel', 'vendor']);
gulp.task('test', ['runtests']);

gulp.task('watch', function () {
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/modules/**/*.js', ['babel']);
    gulp.watch([
        'app/index.html',
        'app/images/*',
        'app/scripts/*.js',
        'app/styles/*.min.css'
    ], ['reload']);
    gulp.watch('bower.json', ['bower']);
});

// Initial setup... Wait for jekyll-build, then launch the Server
gulp.task('browser-sync', ['build'], function() {
    browserSync({
        port: 9000,
        server: {
            baseDir: 'app'
        }
    });
});

gulp.task('reload', [], function() {
    browserSync.reload();
});

// Build sass into a single site.min.css
gulp.task('sass', function () {
    browserSync.notify('Running: sass');
    gulp.src('app/styles/**/*.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            onError: browserSync.notify,
            errLogToConsole: true
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        .pipe(minifyCSS())
        .pipe(rename('site.min.css'))
        .pipe(sourcemaps.write())
        .pipe(debug())
        .pipe(gulp.dest('app/styles'));
});

gulp.task('vendor', function() {
    gulp.src([
    ])
    .pipe(sourcemaps.init())
    .pipe(minifyCSS())
    .pipe(concat('vendor.min.css'))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest('app/styles'));
});

gulp.task('babel', function() {
    //gulp.src('app/src/main.js')
    gulp.src('app/src/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(babel())
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('runtests', function() {
    return gulp.src('spec/test.js')
        .pipe(jasmine({
            verbose: true,
            includeStackTrace: true
        }));
});
