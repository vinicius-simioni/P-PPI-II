const router = require("express").Router();
const upload = require("../middlewares/multer");
const verifyTokenMiddleware = require("../middlewares/verifyTokenMiddleware");

const LivroController = require('../controllers/LivroController');
const UsuarioController = require('../controllers/UsuarioController');
const AvaliacaoController = require('../controllers/AvaliacaoController');
const MensagemController = require("../controllers/MensagemController");
const TrocaController = require('../controllers/TrocaController');

// Rotas para autenticação
router.route("/register").post(UsuarioController.create);
router.route("/login").post(UsuarioController.login);
router.put('/usuarios', verifyTokenMiddleware, UsuarioController.update);
router.get('/usuarios/me', verifyTokenMiddleware, UsuarioController.getById);

// Rotas para livros
router.get('/livros', verifyTokenMiddleware, LivroController.index);
router.get('/livros/:id', verifyTokenMiddleware, LivroController.show);
router.post('/livros', verifyTokenMiddleware, LivroController.store);
router.put('/livros/:id', verifyTokenMiddleware, LivroController.update);
router.delete('/livros/:id', verifyTokenMiddleware, LivroController.destroy);
router.get('/livros-usuario', verifyTokenMiddleware, LivroController.findBookByUser);
router.get('/livros-busca', verifyTokenMiddleware, LivroController.search);

// Rotas para avaliações
router.post("/avaliacao/:id", verifyTokenMiddleware, AvaliacaoController.criarAvaliacao);
router.get("/avaliacoes/:id", verifyTokenMiddleware, AvaliacaoController.listarAvaliacoes);

// Rotas para mensagens
router.post("/mensagens", verifyTokenMiddleware, MensagemController.enviarMensagem);
router.get("/mensagens", verifyTokenMiddleware, MensagemController.listarMensagens);
router.get('/mensagens/:id', verifyTokenMiddleware, MensagemController.historicoMensagens);
router.get('/chats', verifyTokenMiddleware, MensagemController.listarChats);

// Rotas para trocas
router.post('/trocas', verifyTokenMiddleware, TrocaController.criarTroca);
router.put('/trocas/:id', verifyTokenMiddleware, TrocaController.atualizarTroca);
router.get("/trocas-recebidas", verifyTokenMiddleware, TrocaController.listarTrocasRecebidas);
router.get("/trocas-enviadas", verifyTokenMiddleware, TrocaController.listarTrocasEnviadas);
router.put('/trocas/:id/status',verifyTokenMiddleware, TrocaController.atualizarStatus);
router.get("/sugestoes", verifyTokenMiddleware, TrocaController.getSugestoes);

module.exports = router;
