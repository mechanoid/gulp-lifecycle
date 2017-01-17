const gulp = require('gulp');
const del = require('del');

const GulpLifecycle = require('gulp-lifecycle')

class AppBuild extends GulpLifecycle {

  registerPreBuild(gulp, config) {
    gulp.task('clean', () => del([
      config.build.path, // clean up general build files
    ]));

    return ['clean'];
  }

}

module.exports = AppBuild
