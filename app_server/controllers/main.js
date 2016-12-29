/* GET home page */
module.exports.index = function(req, res){
   res.render('index', { title: 'Home' });
};

module.exports.visualizar = function(req, res){
   res.render('visualizar', { title: 'Visualizar' });
};

module.exports.emitir = function(req, res){
   res.render('emitir', { title: 'Emitir' });
};

module.exports.login = function(req, res){
   res.render('login', { title: 'Login' });
};

module.exports.register = function(req, res){
   res.render('register', { title: 'Register' });
};
