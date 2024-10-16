const router = require("express").Router();
const upload = require("../middlewares/multer");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

const LivroController = require('../controllers/LivroController');
const UsuarioController = require('../controllers/UsuarioController');
const AvaliacaoController = require('../controllers/AvaliacaoController');

// Rotas para autenticação
router.route("/register").post(UsuarioController.create);
router.route("/login").post(UsuarioController.login);

// Rotas para livros
router.get('/livros', verifyTokenMiddleware, LivroController.index);
router.get('/livros/:id', verifyTokenMiddleware, LivroController.show);
router.post('/livros', verifyTokenMiddleware, LivroController.store);
router.put('/livros/:id', verifyTokenMiddleware, LivroController.update);
router.delete('/livros/:id', verifyTokenMiddleware, LivroController.destroy);
router.get('/livros-usuario', verifyTokenMiddleware, LivroController.findBookByUser);
router.get('/livros-busca', verifyTokenMiddleware, LivroController.search);

// Rotas para avaliações
router.get('/avaliacoes', AvaliacaoController.index);
router.get('/avaliacoes/:id', AvaliacaoController.show);
router.post('/avaliacoes', AvaliacaoController.store);
router.put('/avaliacoes/:id', AvaliacaoController.update);
router.delete('/avaliacoes/:id', AvaliacaoController.destroy);

module.exports = router;
