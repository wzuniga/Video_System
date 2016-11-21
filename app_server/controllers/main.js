/* GET home page */
module.exports.index = function(req, res){
   res.render('index', { title: 'Video XXX Streaming' });
};

module.exports.visualizar = function(req, res){
   res.render('visualizar', { title: 'Video XXX Streaming' });
};

module.exports.emitir = function(req, res){
   res.render('emitir', { title: 'Video XXX Streaming' });
};
