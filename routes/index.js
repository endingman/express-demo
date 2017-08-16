var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index/index', { title: 'Express' });
});

/**登录后home**/
router.get('/home', function(req, res, next) {
    var user = {
        username: 'admin',
        password: 'admin'
    }
    res.render('index/home', { title: 'Home', user: user });
});

module.exports = router;