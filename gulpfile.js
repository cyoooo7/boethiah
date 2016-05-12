var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babel = require("gulp-babel");
var exec = require('child_process').exec;

var paths = {
  core: './core/**/*.*',
  coreLib: './core/src/**/*.*',
  coreRes: './core/res/**/*.*',
  coreIndexHtml: './core/index.html',
  electron: './electron/**/*.*',
  web: './web/**/*.*',
  webRes: './web/res/**/*.*',
  serverCore: './server/core/',
  serverRes: './server/res/',
  binElectron: './bin/electron/',
  binWeb: './bin/web',
  binWebMainjs: './bin/web/main.js',
  binWebSrc: './bin/web/src/'
};

function copy(src, dst) {
  var promise = new Promise((resolve, reject) => {
    gulp.src(src).pipe(gulp.dest(dst)).on('end', () => {
      resolve();
    });
  });
  return promise;
}

function bundle(src, dst) {
  var promise = new Promise((resolve, reject) => {
    gulp.src(src)
      .pipe(browserify({
        insertGlobals: true,
        debug: true,
        ignore: 'remote'
      }))
      .pipe(babel())
      .pipe(gulp.dest(dst))
      .on('end', () => {
        resolve();
      });
  });
  return promise;
}

gulp.task('build-electron', cb => {
  copy(paths.core, paths.binElectron).then(() => {
    copy(paths.electron, paths.binElectron).then(cb);
  });
});

gulp.task('build-web', cb => {
  copy(paths.core, paths.binWeb).then(() => {
    copy(paths.web, paths.binWeb).then(() => {
      bundle(paths.binWebMainjs, paths.serverRes).then(() => {
        copy(paths.webRes, paths.serverRes).then(() => {
          cb();
        });
      });
    });
  });

});

gulp.task('build-server', cb => {
  Promise.all([
    copy(paths.coreLib, paths.serverCore),
    copy(paths.coreIndexHtml, paths.serverRes),
    copy(paths.coreRes, paths.serverRes)
  ]).then(() => {
    cb();
  });
});

gulp.task('watch', () => {
  gulp.watch(paths.core, ['build-electron', 'build-server', 'build-web']);
  gulp.watch(paths.electron, ['build-electron']);
  gulp.watch(paths.web, ['build-web']);
});

gulp.task('build', ['build-electron', 'build-server', 'build-web']);

gulp.task('default', ['build', 'watch']);var gulp = require('gulp');
var browserify = require('gulp-browserify');
var babel = require("gulp-babel");

var paths = {
  core: './core/**/*.*',
  coreLib: './core/src/**/*.*',
  coreRes: './core/res/**/*.*',
  coreIndexHtml: './core/index.html',
  electron: './electron/**/*.*',
  web: './web/**/*.*',
  webRes: './web/res/**/*.*',
  serverCore: './server/core/',
  serverRes: './server/res/',
  binElectron: './bin/electron/',
  binWeb: './bin/web',
  binWebMainjs: './bin/web/main.js',
  binWebSrc: './bin/web/src/'
};

function copy(src, dst) {
  var promise = new Promise((resolve, reject) => {
    gulp.src(src).pipe(gulp.dest(dst)).on('end', () => {
      resolve();
    });
  });
  return promise;
}

function bundle(src, dst) {
  var promise = new Promise((resolve, reject) => {
    gulp.src(src)
      .pipe(browserify({
        insertGlobals: true,
        debug: true,
        ignore: 'remote'
      }))
      .pipe(babel())
      .pipe(gulp.dest(dst))
      .on('end', () => {
        resolve();
      });
  });
  return promise;
}

gulp.task('build-electron', cb => {
  copy(paths.core, paths.binElectron).then(() => {
    copy(paths.electron, paths.binElectron).then(cb);
  });
});

gulp.task('build-web', cb => {
  copy(paths.core, paths.binWeb).then(() => {
    copy(paths.web, paths.binWeb).then(() => {
      bundle(paths.binWebMainjs, paths.serverRes).then(() => {
        copy(paths.webRes, paths.serverRes).then(() => {
          cb();
        });
      });
    });
  });

});

gulp.task('build', ['build-electron', 'build-server', 'build-web']);

gulp.task('build-server', cb => {
  Promise.all([
    copy(paths.coreLib, paths.serverCore),
    copy(paths.coreIndexHtml, paths.serverRes),
    copy(paths.coreRes, paths.serverRes)
  ]).then(() => {
    cb();
  });
});

gulp.task('run-electron', ['build-electron'], cb => {
  exec('electron bin/electron');
  cb();
});

gulp.task('watch', () => {
  gulp.watch(paths.core, ['build-electron', 'build-server', 'build-web']);
  gulp.watch(paths.electron, ['build-electron']);
  gulp.watch(paths.web, ['build-web']);
});

gulp.task('default', ['build', 'watch']);
