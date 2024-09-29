const router = require("express").Router();
const upload = require("../middlewares/multer");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

const AutorController = require('../controllers/AutorController');
const EditoraController = require('../controllers/EditoraController');
const LivroController = require('../controllers/LivroController');
const UsuarioController = require('../controllers/UsuarioController');
const UsuarioLivroController = require('../controllers/UsuarioLivroController');
const AvaliacaoController = require('../controllers/AvaliacaoController');

// Rotas para autenticação
router.route("/users").post(UsuarioController.create);
router.route("/login").post(UsuarioController.login);

// Rotas para autores
router.get('/autores', AutorController.index);
router.get('/autores/:id', AutorController.show);
router.post('/autores', AutorController.store);
router.put('/autores/:id', AutorController.update);
router.delete('/autores/:id', AutorController.destroy);

// Rotas para editoras
router.get('/editoras', EditoraController.index);
router.get('/editoras/:id', EditoraController.show);
router.post('/editoras', EditoraController.store);
router.put('/editoras/:id', EditoraController.update);
router.delete('/editoras/:id', EditoraController.destroy);

// Rotas para livros
router.get('/livros', LivroController.index);
router.get('/livros/:id', LivroController.show);
router.post('/livros', LivroController.store);
router.put('/livros/:id', LivroController.update);
router.delete('/livros/:id', LivroController.destroy);

// Rotas para associações de usuários e livros
router.get('/usuarios-livros', UsuarioLivroController.index);
router.get('/usuarios-livros/:id', UsuarioLivroController.show);
router.post('/usuarios-livros', UsuarioLivroController.store);
router.put('/usuarios-livros/:id', UsuarioLivroController.update);
router.delete('/usuarios-livros/:id', UsuarioLivroController.destroy);

// Rotas para avaliações
router.get('/avaliacoes', AvaliacaoController.index);
router.get('/avaliacoes/:id', AvaliacaoController.show);
router.post('/avaliacoes', AvaliacaoController.store);
router.put('/avaliacoes/:id', AvaliacaoController.update);
router.delete('/avaliacoes/:id', AvaliacaoController.destroy);

module.exports = router;
