const runner = require('../task-runner');
const mincss = require('./runner-mincss');
const transform = require('./runner-transform');

runner.task('minify-css', function () {
  runner
    .src('./toto.css')
    .pipe(mincss({
      stats: true
    }))
    .pipe(transform({
      caseType: 'upper'
    }))
    .pipe(runner.dest('./toto.min.css'));
});

runner.task('change-case', function () {
  runner
    .src('./toto.css')
    .pipe(transform({
      caseType: 'upper'
    }))
    .pipe(runner.dest('./toto-upper.css'));
});

runner.task('upper-mincss', ['change-case', 'minify-css']);