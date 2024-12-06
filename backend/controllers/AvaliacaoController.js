const { Avaliacao, Usuario } = require("../models");

class AvaliacaoController {
  async criarAvaliacao(req, res) {
    try {
      const id_usuario_avaliador = req.user_id;
      const { nota, comentario } = req.body;
      const id_usuario_avaliado = req.params.id;

      console.log(id_usuario_avaliado, id_usuario_avaliador, nota, comentario)

      // Verificar se os usuários existem
      const usuarioAvaliado = await Usuario.findByPk(id_usuario_avaliado);
      const usuarioAvaliador = await Usuario.findByPk(id_usuario_avaliador);

      if (!usuarioAvaliado || !usuarioAvaliador) {
        return res.status(400).json({ error: "Usuários não encontrados" });
      }

      // Criar avaliação
      const avaliacao = await Avaliacao.create({
        id_usuario_avaliado,
        id_usuario_avaliador,
        nota,
        comentario,
      });

      return res.status(201).json(avaliacao);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao cadastrar avaliação" });
    }
  }

  async listarAvaliacoes(req, res) {
    try {
      const { id } = req.params;

      const avaliacoes = await Avaliacao.findAll({
        where: { id_usuario_avaliado: id },
        include: [
          { model: Usuario, as: "avaliado", attributes: ["nome"] },
          { model: Usuario, as: "avaliador", attributes: ["nome"] },
        ],
      });

      return res.status(200).json(avaliacoes);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar avaliações" });
    }
  }
}

module.exports = new AvaliacaoController();
