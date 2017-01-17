## Description

A lifecycle structuring class hierarchy, to establish an inheritance chain for simple tasks lifecycles,
or better to reduce the boilerplate between task setups.

The GulpLifecycle class provides a few lifecycle steps, you can override in inheriting classes
to give your gulp files a more concise structure.

1. `registerPreBuild(gulp, config) { ... }`
2. `registerBuild(gulp, config) { ... }`
3. `registerPostBuild(gulp, config) { ... }`

Each of those lifecycle methods should return a sequence (see gulp-sequence) of tasks,
that should be run in context of that lifecycle step.

## Usage

```
const GulpLifecycle = require('gulp-lifecycle')

class AppBuild extends GulpLifecycle {

  registerPreBuild(gulp, config) {
    gulp.task('clean', () => del([
      config.build.path, // clean up general build files
    ]))

    return ['clean']
  }

}
```

```
const BaseLifecycle = require('./base-lifecycle')

const config = {
  // ...
};

class JsBuild extends BaseLifecycle {

  registerBuild() {
    gulp.task('list-files', () =>
      gulp.src(config.build.jsGlob)
        .pipe(print())
        .pipe(gulp.dest(config.build.path)));

    return ['list-files']
  }

}

new JsBuild(gulp, config).init()

```
