var gulp = require('gulp');
var del = require('del');
var config = require('../config').optimize.deleteIt;

gulp.task('cleancss', function(cb) {
	del(config.css, {force: true}, cb)
});