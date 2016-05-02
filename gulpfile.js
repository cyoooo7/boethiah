var gulp = require('gulp');
var browserify = require('gulp-browserify');

var paths = {
  allScripts: './app/**/*.js',
  coreScripts: './app/core/**/*.js',
  res: './app/res/**/*.*',
  html: './app/index.html',
  mainjs: './app/main.js',
  webRes: './server/res'
};

gulp.task('bundle', function () {
  gulp.src(paths.mainjs)
    .pipe(browserify({
      insertGlobals: true,
      debug: true,
      ignore: 'remote'
    }))
    .pipe(gulp.dest(paths.webRes))
    .pipe(gulp.dest('./phonegap/www'));
});

gulp.task('mirror', function () {
  gulp.src(paths.html)
    .pipe(gulp.dest(paths.webRes));
  gulp.src(paths.res)
    .pipe(gulp.dest(paths.webRes));
  gulp.src(paths.coreScripts)
    .pipe(gulp.dest('./server/core'));

  gulp.src(paths.html)
    .pipe(gulp.dest('./phonegap/www'));
  gulp.src(paths.res)
    .pipe(gulp.dest('./phonegap/www/res'));
});

gulp.task('watch', function () {
  gulp.watch(paths.allScripts, ['bundle']);
  gulp.watch([paths.html, paths.res, paths.coreScripts], ['mirror']);
  gulp.watch('app/res/*.*', ['mirror']);
  gulp.watch('app/core/*.*', ['mirror']);
});

gulp.task('default', ['bundle', 'mirror', 'watch']);