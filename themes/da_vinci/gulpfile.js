//Configuration
var host = 'ddv8.local';
var sourceDirSass = './src/sass';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cssGlobbing = require('gulp-css-globbing');
var autoprefixer = require('gulp-autoprefixer');
var browserSync = require('browser-sync');
var cssGlobbing = require('gulp-css-globbing');

require('es6-promise').polyfill();

gulp.task('sass', function (){
  return gulp.src(sourceDirSass + '/**/*.sass')
    .pipe(cssGlobbing({
      extensions: ['.sass'],
      autoReplaceBlock: {
        onOff: false,
        globBlockBegin: 'cssGlobbingBegin',
        globBlockEnd: 'cssGlobbingEnd',
        globBlockContents: '../**/*.sass'
      },
      scssImportPath: {
        leading_underscore: false,
        filename_extension: false
      }
    }))
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(autoprefixer({browsers: ['> 1%', 'last 2 versions', 'Firefox >= 20']}))
    .pipe(sourcemaps.init())
    .pipe(sourcemaps.write("./"))
    .pipe(gulp.dest('./css/'))
    .pipe(browserSync.reload({
      stream: true
    }));
});

gulp.task('browser-sync', function() {
    //initialize browsersync
    browserSync.init({
    //browsersync with a php server
    proxy: host,
    notify: true
    });
});

// Watch postcss folder for changes
gulp.task('watch', ['browser-sync', 'sass'], function() {
  //gulp.watch('./src/sass/**/*.sass', ['sass']);
  gulp.watch(sourceDirSass + '/**/*.{scss,sass}', ['sass']);
  gulp.watch('./js/**/*.js', browserSync.reload);
  gulp.watch('./templates/**/*.twig', browserSync.reload);
});

// Creating a default task
gulp.task('default', ['sass', 'watch']);
