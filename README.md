## Description

A lifecycle structuring class hierarchy, to establish an inheritance chain for simple tasks lifecycles,
or better to reduce the boilerplate between task setups.

The GulpLifecycle class provides a few lifecycle steps, you can override in inheriting classes
to give your gulp files a more concise structure.

1. `registerPreBuild(gulp, config) { ... }`
2. `registerBuild(gulp, config) { ... }`
3. `registerPostBuild(gulp, config) { ... }`

Each of those lifecycle methods should return a sequence (see gulp-sequence) of tasks,
that should run in context of that lifecycle step.

Take a look at the [example](./example) for more information.

To run the example, install the dependencies with `npm install` and call `npm start` afterwards.
As a result you should receive the gulp task output

```
Starting 'build'...
Starting 'lifecycle:pre-build'...
Starting 'clean'...
Finished 'clean' after 4.89 ms
Finished 'lifecycle:pre-build' after 6.4 ms
Starting 'lifecycle:build'...
Starting 'list-files'...
Finished 'list-files' after 8.07 ms
Finished 'lifecycle:build' after 8.33 ms
Starting 'lifecycle:post-build'...
Finished 'lifecycle:post-build' after 1.27 μs
Finished 'build' after 17 ms
Starting 'default'...
Finished 'default' after 1.87 μs
```

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
