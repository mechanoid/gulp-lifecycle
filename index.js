const sequence = require('gulp-sequence');


const buildCallback = (tasks) => {
  if (tasks && tasks.length > 0) {
    return (done) => sequence(...tasks, done)
  }

  return []
}

class GulpLifecycle {
  constructor(gulp, config) {
    this.gulp = gulp;
    this.config = config;
  }

  registerPreBuild(gulp, config) {
    return []
  }

  registerPostBuild(gulp, config) {
    return []
  }

  registerBuild(gulp, config) {
    return []
  }

  preBuild(gulp, config) {
    const tasks = this.registerPreBuild(gulp, config)

    gulp.task('lifecycle:pre-build', buildCallback(tasks));
  }

  postBuild(gulp, config) {
    const tasks = this.registerPostBuild(gulp, config)

    gulp.task('lifecycle:post-build', buildCallback(tasks));
  }

  build(gulp, config) {
    const tasks = this.registerBuild(gulp, config)

    gulp.task('lifecycle:build', buildCallback(tasks));
  }

  init() {
    this.preBuild(this.gulp, this.config)
    this.postBuild(this.gulp, this.config)
    this.build(this.gulp, this.config)

    /* Build Lifecycle */

    this.gulp.task('build', sequence('lifecycle:pre-build', 'lifecycle:build', 'lifecycle:post-build'));

    this.gulp.task('default', ['build']);
  }
}

module.exports = GulpLifecycle
