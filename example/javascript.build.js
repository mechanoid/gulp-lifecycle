const resolve = require('path').resolve;
const join = require('path').join;

const gulp = require('gulp');
const print = require('gulp-print');

const BaseLifecycle = require('./base-lifecycle')

const config = {
  get baseName() { return 'javascripts' },
  get assetPath() { return resolve('src') },
  get buildPath() { return resolve('build') },

  src: {
    get path() { return join(config.assetPath, config.baseName) },
    get jsGlob() { return join(this.path, '**/*.js') }
  },

  build: {
    get path() { return join(config.buildPath, config.baseName) },
  }
};

class JsBuild extends BaseLifecycle {

  registerBuild() {
    gulp.task('list-files', () =>
      gulp.src(config.src.jsGlob)
        .pipe(print())
        .pipe(gulp.dest(config.build.path)));

    return ['list-files']
  }

}

new JsBuild(gulp, config).init()
