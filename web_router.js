var express = require('express');
var router = express.Router();

var index = require('./controllers/index');
var users = require('./controllers/users');

var userMiddleware = require('./middlewares/users');

//index controller
router.get('/', index.index); // 初始页
router.get('/home', userMiddleware.authentication, index.home); // 用户主页

// users controller
router.get('/users', users.index);
router.get('/login', userMiddleware.notAuthentication, users.login); // login登录页
router.post('/login', users.dologin); // login登录进去
router.get('/logout', userMiddleware.authentication, users.logout); // logout

// 输出路由模型
module.exports = router;