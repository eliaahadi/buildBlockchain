require('babel-core/register')({
	'presets':['es2015', 'react', 'stage-1']
});

const express = require('express');
const path = require('path');
const favicon = require('serve-favicon');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
//PROXY
var httpProxy = require('http-proxy');

const index = require('./routes/index');

const app = express();
app.use(favicon(path.join(__dirname, '../public', 'favicon.ico')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

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

//PROXY TO API
const apiProxy =
httpProxy.createProxyServer({
	target:'http://localhost:4001'
});
app.use('/api', function(req, res){
	apiProxy.web(req, res);
});
// END PROXY
app.use(express.static(path.join(__dirname, 'public')));


app.use(function(err, req, res, next) {
	console.error(err.stack);
	res.status(500).send('Something broke!', err);
});
/*
// catch 404 and forward to error handler
app.use((request, response, next) => {
	console.log('app.js test ', response);
	// const error = new Error('Not Found');
	// error.status = 404;
	next();
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
*/




module.exports = app;
