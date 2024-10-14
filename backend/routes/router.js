const router = require("express").Router();
const upload = require("../middlewares/multer");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

const LivroController = require('../controllers/LivroController');
const UsuarioController = require('../controllers/UsuarioController');
const AvaliacaoController = require('../controllers/AvaliacaoController');

// Rotas para autenticação
router.route("/users").post(UsuarioController.create);
router.route("/login").post(UsuarioController.login);

// Rotas para livros
router.get('/livros', LivroController.index);
router.get('/livros/:id', LivroController.show);
router.post('/livros', verifyTokenMiddleware, LivroController.store);
router.put('/livros/:id', LivroController.update);
router.delete('/livros/:id', LivroController.destroy);

// Rotas para avaliações
router.get('/avaliacoes', AvaliacaoController.index);
router.get('/avaliacoes/:id', AvaliacaoController.show);
router.post('/avaliacoes', AvaliacaoController.store);
router.put('/avaliacoes/:id', AvaliacaoController.update);
router.delete('/avaliacoes/:id', AvaliacaoController.destroy);

module.exports = router;
