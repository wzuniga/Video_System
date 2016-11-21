var express = require('express');
var router = express.Router();
var ctrlHome = require('../controllers/main');

/* GET home page. */
router.get('/', ctrlHome.index);

router.get('/emitir', ctrlHome.emitir);
router.get('/visualizar', ctrlHome.visualizar);
router.get('/login', ctrlHome.login);
router.get('/register', ctrlHome.register);

module.exports = router;
