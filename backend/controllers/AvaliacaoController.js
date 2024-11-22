const { Avaliacao, Usuario } = require('../models');

class AvaliacaoController {
  async criarAvaliacao(req, res) {
    const { id_usuario_avaliado, nota, comentario } = req.body;
    const id_usuario_avaliador = req.user_id; // Pega o ID do usuário autenticado

    if (id_usuario_avaliado === id_usuario_avaliador) {
      return res.status(400).json({ error: "Você não pode se autoavaliar." });
    }

    try {
      // Criação da avaliação
      await Avaliacao.create({
        id_usuario_avaliado,
        id_usuario_avaliador,
        nota,
        comentario,
      });

      // Recalcula a reputação média do usuário avaliado
      const avaliacoes = await Avaliacao.findAll({
        where: { id_usuario_avaliado },
        attributes: ["nota"],
      });

      const reputacaoMedia =
        avaliacoes.reduce((total, avaliacao) => total + avaliacao.nota, 0) /
        avaliacoes.length;

      // Atualiza a reputação no perfil do usuário avaliado
      await Usuario.update(
        { reputacao: reputacaoMedia.toFixed(2) },
        { where: { id: id_usuario_avaliado } }
      );

      res.status(201).json({ message: "Avaliação criada com sucesso!" });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao criar a avaliação." });
    }
  }
}

module.exports = new AvaliacaoController();
