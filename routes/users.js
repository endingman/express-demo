var express = require('express');
var router = express.Router();

/* users界面 */
router.get('/', function(req, res, next) {
    res.send('respond with a resource');
});
// 定义 login 页面的路由
router.get('/login', function(req, res) {
    res.render('users/login', { title: '用户登陆' });
});
// 定义 dologin 页面的路由
router.post('/login', function(req, res) {
    console.log('req',req);
    var user = {
        username: 'admin',
        password: 'admin'
    }
    if (req.body.username === user.username && req.body.password === user.password) {
        res.redirect('/home');
    }
    res.redirect('login');
});
// 定义 logout 页面的路由
router.get('/logout', function(req, res) {
    console.log('req',req);
    res.redirect('/');
});


module.exports = router;