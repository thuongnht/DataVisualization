var gulp = require('gulp');
var csslint = require('gulp-csslint');
var minifycss = require('gulp-minify-css');
var size = require('gulp-size');
var config = require('../config').optimize.css;

gulp.task('optimize:css', function() {
	return gulp.src(config.src)
			.pipe(csslint())
			.pipe(csslint.reporter())
			.pipe(minifycss(config.options))
			.pipe(gulp.dest(config.dest))
			.pipe(size());
});