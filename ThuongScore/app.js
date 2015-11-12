var express = require('express');
var bodyParser = require('body-parser'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  methodOverride = require('method-override'),
  errorHandler = require('error-handler'),
  morgan = require('morgan'),
  http = require('http'),
  path = require('path');
var engines = require('consolidate');
var mongoose = require('mongoose');
var passport = require('passport');
var util = require('util');
var flash = require('connect-flash');
var expose = require('express-expose');

// Bootstrap express
var app = module.exports.app = exports.app = express();


/**
 * Configuration
 */
// all environments
app.set('port', process.env.PORT || 3000);
app.engine('html', require('jade').__express);
app.set('views', __dirname + '/views');
app.set('view engine', 'html');
app.set('view engine', 'ejs');
app.set("view options", { layout: false });
app.use(morgan('dev'));
app.use(cookieParser());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(bodyParser.json());
app.use(session({ secret: 'keyboard cat', key: 'sid' }));
app.use(flash()); // use connect-flash for flash messages stored in session
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));

// routes ======================================================================
require('./routes/routing.js')(app); // load our routes and pass in our app and fully configured passport



/**
 * Start Server
 */
http.createServer(app).listen(app.get('port'), function () {
  console.log('Express server listening on port ' + app.get('port'));
});
