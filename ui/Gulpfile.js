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
var gaze        = require('gaze');
var imagemin    = require('gulp-imagemin');
var jasmine     = require('gulp-jasmine');
var karma       = require('gulp-karma');
var mbf         = require('main-bower-files');
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
gulp.task('build', ['sass', 'js', 'vendor']);
gulp.task('test', ['build', 'runtests']);


gulp.task('watch', function () {

    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/modules/**/*.js', ['js']);
    gulp.watch([
        'spec/**/*.js',
        'app/scripts/*.js'
    ], {
        debounceDelay: 5000
    }, ['runtests']);
});

// Initial setup... Wait for jekyll-build, then launch the Server
gulp.task('browser-sync-prepare', ['sass', 'js', 'vendor']);
gulp.task('browser-sync', ['browser-sync-prepare'], function() {
    browserSync({
        port: 9000,
        files: [
            'app/index.html',
            'app/fonts/*',
            'app/images/*',
            'app/modules/**/*.html',
            'app/scripts/vendor.min.js',
            'app/scripts/main.js',
            'app/styles/*.min.css'
        ],
        watchOptions: {
            ignoreInitial: true
        },
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
    // thanks @esvendsen !!!
    var jsRegex = (/.*\.js$/i),
        cssRegex = (/.*\.css$/i);

	gulp.src(mbf({ filter: jsRegex }))
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        //.pipe(gulp.dest('app/scripts'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/scripts'));

    gulp.src(mbf({ filter: cssRegex }))
        .pipe(concat('vendor.css'))
        .pipe(gulp.dest('app/styles'));
});

gulp.task('js', function() {
    //gulp.src('app/src/main.js')
    gulp.src('app/modules/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        //.pipe(uglify())
        //.pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('runtests', function() {
    gulp.src('karmaconf')
        .pipe(karma({
            configFile: 'karma.conf.js'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        });
});
