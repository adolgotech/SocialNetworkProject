var gulp = require('gulp');
var fs = require('fs');

gulp.task('watch:js', ['js'], function(){
  gulp.watch('ng/**/*.js', ['js']);
});

gulp.task('watch:css', ['css'], function(){
  gulp.watch('css/**/*.styl', ['css']);
});

gulp.task('dev', ['watch:js', 'watch:css', 'dev:server']);

fs.readdirSync(__dirname + '/gulp').forEach(function(task){
  require('./gulp/' + task);
});
