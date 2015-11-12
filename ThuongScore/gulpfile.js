//var requireDir = require('require-dir');
var gulp = require('gulp');
var gls = require('gulp-live-server');

//requireDir('./gulp/tasks', {recurse: true} );

gulp.task('default', function () {
    //gulp.start('optimize:css', 'optimize:images', 'optimize:js');

    //gulp.start('watch');
    /*var server = gls.new('app.js');
    server.start().then(function(result) {
    console.log('Server exited with result:', result);
    process.exit(result.code);
    });*/

    //2. run script with cwd args, e.g. the harmony flag
    var server = gls(['--harmony', 'app.js']);
    //this will achieve `node --harmony app.js`
    server.start();

    //use gulp.watch to trigger server actions(notify, start or stop)
    gulp.watch(['public/**/*.css', 'public/data/*.json', 'views/**/*.html', 'public/**/*.js', 'routes/**/*.js', 'models/**/*.js'], function (file) {
        server.notify.apply(server, [file]);
        console.log("changed");
    });
    gulp.watch('app.js', function() {
        console.log("server restarting ...");
        server.start.bind(server)();
    }); //restart my server
});