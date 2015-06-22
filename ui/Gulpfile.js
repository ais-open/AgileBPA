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
var karma       = require('gulp-karma');
var mbf         = require('main-bower-files');
var minifyCSS   = require('gulp-minify-css');
var moment      = require('moment');
var os          = require('os');
var path        = require('path');
var pkg         = require('./package.json');
var prefix      = require('gulp-autoprefixer');
var rename      = require('gulp-rename');
var rimraf      = require('rimraf');
var runSequence = require('run-sequence');
var sass        = require('gulp-sass');
var sourcemaps  = require('gulp-sourcemaps');
var uglify      = require('gulp-uglify');
var uncss       = require('gulp-uncss');
var wiredep     = require('wiredep').stream;


gulp.task('default', ['develop']);
gulp.task('build', ['sass', 'js', 'vendor']);
gulp.task('test', function() {
    runSequence('build', 'runtests');
});

gulp.task('develop', function() {
    runSequence('build', ['watch', 'browser-sync']);
});


gulp.task('watch', function () {
    gulp.watch('app/styles/**/*.scss', ['sass']);
    gulp.watch('app/modules/**/*.js', ['js']);
    gulp.watch('bower.json', ['vendor']);
    gulp.watch([
        'spec/**/*.js',
        'app/scripts/*.js'
    ], {
        debounceDelay: 5000
    }, ['runtests']);
});

gulp.task('browser-sync', function() {
    browserSync({
        port: 9000,
        files: [
            'app/*.html',
            'app/fonts/*',
            'app/images/*',
            'app/modules/**/*.html',
            'app/scripts/*.js',
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

// Build sass into a single site.min.css
gulp.task('sass', function () {
    browserSync.notify('Running: sass');

    //var bootstrap = 'app/bower_components/bootstrap-sass/assets/stylesheets';
    var fontawesome = 'app/bower_components/fontawesome/scss';

    return gulp.src('app/styles/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            onError: browserSync.notify,
            errLogToConsole: true,
            //includePaths: [ bootstrap, fontawesome ]
            includePaths: [fontawesome]
        }))
        .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
        //.pipe(minifyCSS())
        .pipe(rename('site.min.css'))
        .pipe(sourcemaps.write())
        //.pipe(debug())
        .pipe(gulp.dest('app/styles'));
});

// thanks @esvendsen !!!
gulp.task('vendor', ['vendor-js']);
gulp.task('vendor-js', function() {
    var jsRegex = (/.*\.js$/i);
    return gulp.src(mbf({ filter: jsRegex }))
        //.pipe(debug())
        .pipe(sourcemaps.init())
        .pipe(concat('vendor.js'))
        //.pipe(gulp.dest('app/scripts'))
        .pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('js', function() {
    return gulp.src('app/modules/**/*.js')
        .pipe(sourcemaps.init())
        .pipe(concat('main.js'))
        //.pipe(uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('app/scripts'));
});

gulp.task('runtests', function() {
    return gulp.src('karmaconf')
        .pipe(karma({
            configFile: 'karma.conf.js'
        }))
        .on('error', function(err) {
            console.log(err);
            this.emit('end');
        });
});
