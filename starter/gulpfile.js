const gulp = require('gulp')
const run = require('gulp-run')

gulp.task('runNpm', function () {
  return run('npm run build').exec()
})

gulp.task('movePackage', ['runNpm'], function () {
  return gulp.src('package.json')
    .pipe(gulp.dest('./dist'))
})

gulp.task('build', ['movePackage'], function () {
})
