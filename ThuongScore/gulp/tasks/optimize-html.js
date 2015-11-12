var gulp = require('gulp');
//var html5lint = require('gulp-html5-lint');
var imagemin = require('gulp-htmlmin');
var size = require('gulp-size');
var config = require('../config').optimize.html;

gulp.task('optimize:html', function() {
	return gulp.src(config.src)
			.pipe(imagemin(config.options))
			.pipe(gulp.dest(config.dest));
});
