var express = require('express');
var router = express.Router();

var index = require('./controllers/index');
var users = require('./controllers/users');
var movie = require('./controllers/movie');

var userMiddleware = require('./middlewares/users');

//index controller
router.get('/', index.index); // 初始页
router.get('/home', userMiddleware.authentication, index.home); // 用户主页

// users controller
router.get('/users', users.index);
router.get('/login', userMiddleware.notAuthentication, users.login); // login登录页
router.post('/login', users.dologin); // login登录进去
router.get('/logout', userMiddleware.authentication, users.logout); // logout

// movie controller
router.get('/movie/add',movie.movieAdd);//增加
router.post('/movie/add',movie.doMovieAdd);//提交
router.get('/movie/:name',movie.movieAdd);//编辑查询
router.get('/movie/json/:name',movie.movieJSON);//JSON数据

// 输出路由模型
module.exports = router;