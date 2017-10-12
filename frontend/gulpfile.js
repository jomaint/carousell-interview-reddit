var watchify = require('watchify');
var gulp = require('gulp');
var gutil = require('gulp-util');
var livereload = require('gulp-livereload');
var sass = require('gulp-sass');
var assign = require('lodash.assign');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var babelify = require('babelify');
var concat = require('gulp-concat');
var buffer = require('vinyl-buffer');
var rename = require('gulp-rename');
var source = require('vinyl-source-stream');
var historyApiFallback = require('connect-history-api-fallback');
var browserSync = require("browser-sync").create();

var files = [
    './js/reactjs/app',
];
var bundles = [files.length];
var tasks = files.map(function(entry,i){

    var opts = assign({}, watchify.args, {
            entries: [entry],
            extensions: ['.jsx'],
            debug: true,
            path: ['./js/reactjs/'],
            transform: [babelify]
        });
    bundles[i] =  watchify(browserify(opts))
    var b = bundles[i];
    doBundle(b,entry);
    b.on('update', function(){
        console.log(entry);
        doBundle(b,entry);
    }); // on any dep update, runs the bundler
    b.on('log', gutil.log); // output build logs to terminal
});

//var b = watchify(browserify(opts));
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./",
            middleware: [ historyApiFallback() ]

        }
    });
});
function doBundle(b,output) {
    console.log(output);
    console.log("doBundle");
    return b.bundle()
        // log errors if they happen
        .on('error', gutil.log.bind(gutil, 'Browserify Error'))
        .pipe(source(output.toLowerCase()+'.js'))
        // optional, remove if you don't need to buffer file contents
        .pipe(buffer())
        // optional, remove if you dont want sourcemaps
        .pipe(sourcemaps.init({loadMaps: true})) // loads map from browserify file
        // Add transformation tasks to the pipeline here.
        // .pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
        .pipe(gutil.noop())
        .pipe(rename({ dirname: '' }))  // change current directory to project directory
        .pipe(sourcemaps.write('./')) // writes .map file
        .pipe(gulp.dest('./dist'))
        .pipe(gutil.noop())
        .pipe(browserSync.stream());
}

/* Watch Files For Changes */
gulp.task('watch', ['build'], function () {
    gulp.watch('./static/sass/*.scss', ['sass']);
});


gulp.task('reload', function () {
  browserSync.reload();
});
gulp.task('build', ['sass'], function () {
    console.log('building sass');
});

/* Compile Our Sass */
gulp.task('sass', function () {
    //return gulp.src('core/sass/*.scss')
    return gulp.src('./static/sass/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('./static/styles'))
        .pipe(concat('bundle.css'))
        .pipe(gulp.dest('./static/styles'))
        .pipe(browserSync.stream());
});
gulp.task('scripts', function() {
      tasks();
      return gulp.src('./js/app/*.js')
          .pipe(concat('bundle.js')).pipe(gulp.dest('./dist/'));


});
gulp.task('default', ['watch','browser-sync']);
