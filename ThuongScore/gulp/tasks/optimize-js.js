var gulp = require('gulp');
var hint = require('gulp-jshint');
var minifycss = require('gulp-uglify');
var size = require('gulp-size');
var config = require('../config').optimize.js;

gulp.task('optimize:js', function() {
	return gulp.src(config.src)
			.pipe(hint())
			.pipe(hint.reporter())
			.pipe(minifycss(config.options))
			.pipe(gulp.dest(config.dest))
			.pipe(size());
});
