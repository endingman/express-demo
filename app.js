//加载依赖库
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
//mongo存储session，session-mongoose不支持4.x了，这里我也不知道起作用的是express-session还是session-mongoose
var session = require('express-session');
var connect = require('connect');
var MongoSessionStore = require('session-mongoose')(require('connect'));
var store = new MongoSessionStore({
    url: "mongodb://localhost/session",
    interval: 120000
});

// 加载路由，加载不解析
var webRouter = require('./web_router');


// 创建项目实例
var app = express();

// 实例化express-session
app.use(
    session({
        secret: 'ending man',
        cookie: { maxAge: 60000 }
    })
);

// 定义EJS模板引擎和模板文件位置，也可以使用jade或其他模型引擎
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
// app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
//日志
app.use(logger('dev'));
// 解析器
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// 应用级中间件-路由解析之前，不能之后，否则不经过此处
app.use(function(req, res, next) {
    console.log('user', req.session.user);
    var user = req.session.user;
    if (user) {
        res.locals.user = user;
    } else {
        res.locals.user = null;
    }
    console.log('user-local', res.locals.user);
    var err = req.session.error;
    console.log('err', err);
    delete req.session.error;
    res.locals.message = '';
    if (err) {
        res.locals.message = '<div class="alert alert-error">' + err + '</div>';
    }
    console.log('message', res.locals.message);
    next();
});

/**路由解析，express4.X自动解析路由**/
app.use('/', webRouter);

// 404错误
/**
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});
**/

// 500错误
app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error/error');
});

// 输出模型
module.exports = app;