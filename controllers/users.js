
exports.index = function (req, res, next) {
  res.send('respond with a resource');
};

exports.login = function (req, res, next) {
   res.render('users/login', { title: '用户登陆' });
};

exports.dologin = function (req, res, next) {
   var user = {
        username: 'admin',
        password: 'admin'
    }
    if (req.body.username === user.username && req.body.password === user.password) {
        req.session.user = user;
        console.log('user-login', req.session.user);
        return res.redirect('/home');
    } else {
        req.session.error = '用户名或密码不正确';
        return res.redirect('login');
    }
};

exports.logout = function (req, res, next) {
    req.session.user = null;
    console.log('user-logout', req.session.user);
    res.redirect('/');
};

