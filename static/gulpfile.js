var gulp = require('gulp');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('default', async function() {
  return browserify({
      extensions: ['.js', '.jsx'],
      entries: 'src/jsx/main.js',
  })
  .transform(babelify.configure({
      ignore: [/(node_modules)/]
  }))
  .bundle()
  .on("error", function (err) { console.log("Error : " + err.message); })
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('src/js'));
});
