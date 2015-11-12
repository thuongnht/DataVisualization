var gulp = require('gulp');
var del = require('del');
var config = require('../config').optimize.deleteIt;

gulp.task('cleanjs', function(cb) {
	del(config.js, {force: true}, cb)
});