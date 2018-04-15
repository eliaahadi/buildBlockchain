const express = require('express');
const path = require('path');
var favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const index = require('./routes/index');

const app = express();
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));

var http = require('http');
var finalhandler = require('finalhandler');

var _favicon = favicon(path.join(__dirname, 'public', 'favicon.ico'));

var server = http.createServer(function onRequest (req, res) {
	var done = finalhandler(req, res);

	_favicon(req, res, function onNext (err) {
		if (err) return done(err);

		// continue to process the request here, etc.

		res.statusCode = 404;
		res.end('oops');
	});
});


// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/api', index);
app.use(express.static(path.join(__dirname, '../public')));

// app.get('/', function(req, res){
//   res.send('hello world somewhere');
// });


// catch 404 and forward to error handler
app.use((request, response, next) => {
	console.log('app.js test ', response);
	const error = new Error('Not Found');
	error.status = 404;
	next(error);
});

// error handler
app.use((error, request, response) => {
	// set locals, only providing error in development
	response.locals.message = error.message;
	response.locals.error = request.app.get('env') === 'development' ? error : {};

	// render the error page
	response.status(error.status || 500);
	response.render('error');
});




module.exports = app;
