
exports.index = function (req, res, next) {
  res.render('index/index', { title: 'Express' });
};

exports.home = function (req, res, next) {
  res.render('index/home', { title: 'Home' });
};
