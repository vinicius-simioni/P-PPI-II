const { Avaliacao } = require('../models');

class AvaliacaoController {
  async index(req, res) {
    try {
      const avaliacoes = await Avaliacao.findAll();
      res.status(200).json(avaliacoes);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar avaliações' });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const avaliacao = await Avaliacao.findByPk(id);
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }
      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar avaliação' });
    }
  }

  async store(req, res) {
    const { id_usuarios, pontualidade, conservacao_livro, livro_disponivel } = req.body;
    try {
      const novaAvaliacao = await Avaliacao.create({ id_usuarios, pontualidade, conservacao_livro, livro_disponivel });
      res.status(201).json(novaAvaliacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar avaliação' });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { id_usuarios, pontualidade, conservacao_livro, livro_disponivel } = req.body;
    try {
      const avaliacao = await Avaliacao.findByPk(id);
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }
      avaliacao.id_usuarios = id_usuarios;
      avaliacao.pontualidade = pontualidade;
      avaliacao.conservacao_livro = conservacao_livro;
      avaliacao.livro_disponivel = livro_disponivel;
      await avaliacao.save();
      res.status(200).json(avaliacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar avaliação' });
    }
  }

  async destroy(req, res) {
    const id = req.params.id;
    try {
      const avaliacao = await Avaliacao.findByPk(id);
      if (!avaliacao) {
        return res.status(404).json({ error: 'Avaliação não encontrada' });
      }
      await avaliacao.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar avaliação' });
    }
  }
}

module.exports = new AvaliacaoController();
