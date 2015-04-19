var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoStore = require("connect-mongodb");
var http = require("http");
var session = require('express-session');
var routes = require('./routes/index');
var dburl = require("./config").db;
var sitePort = require("./config").port;
var OpRiskLib = express();

// view engine setup
OpRiskLib.set('views', path.join(__dirname, 'views'));
OpRiskLib.set('view engine', 'jade');

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
OpRiskLib.use(logger('dev'));
OpRiskLib.use(bodyParser.json());
OpRiskLib.use(bodyParser.urlencoded({ extended: false }));
OpRiskLib.use(cookieParser());
OpRiskLib.use(session({
    secret : "nono",
    store : new mongoStore({
        url : dburl,
        collection : "sessions"
    })
}));

//if("development" === app.get("evn")) {
OpRiskLib.locals.pretty = true;
//};

OpRiskLib.use(express.static(path.join(__dirname, 'public')));
routes(OpRiskLib);

// catch 404 and forward to error handler
OpRiskLib.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (OpRiskLib.get('env') === 'development') {
    OpRiskLib.use(function (err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
OpRiskLib.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

http.createServer(OpRiskLib).listen(sitePort);

module.exports = OpRiskLib;

