var gulp = require('gulp');
var config = require('../config').optimize;

gulp.task('watch', function() {
	gulp.watch([config.css.src], ['cleancss', 'optimize:css']);

	gulp.watch([config.js.src], ['cleanjs', 'optimize:js']);

	gulp.watch([config.images.src], ['cleanimages', 'optimize:images']);

	gulp.watch([config.html.src], ['optimize:html']);

	
});