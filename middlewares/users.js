// authentication路由中间件。
var authentication = function(req, res, next) {
    if (!req.session.user) {
        req.session.error = '请先登陆';
        return res.redirect('login');
    }
    next();
};
exports.authentication = authentication;

// notAuthentication路由中间件。
var notAuthentication = function(req, res, next) {
    if (req.session.user) {
        req.session.error = '已登陆';
        return res.redirect('home');
    }
    next();
};
exports.notAuthentication = notAuthentication;
