const { UsuarioLivro } = require('../models');

class UsuarioLivroController {
  async index(req, res) {
    try {
      const usuariosLivros = await UsuarioLivro.findAll();
      res.status(200).json(usuariosLivros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar associações entre usuários e livros' });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const associacao = await UsuarioLivro.findByPk(id);
      if (!associacao) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      res.status(200).json(associacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar associação' });
    }
  }

  async store(req, res) {
    const { id_usuarios, id_livros, status } = req.body;
    try {
      const novaAssociacao = await UsuarioLivro.create({ id_usuarios, id_livros, status });
      res.status(201).json(novaAssociacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar associação' });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { id_usuarios, id_livros, status } = req.body;
    try {
      const associacao = await UsuarioLivro.findByPk(id);
      if (!associacao) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      associacao.id_usuarios = id_usuarios;
      associacao.id_livros = id_livros;
      associacao.status = status;
      await associacao.save();
      res.status(200).json(associacao);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar associação' });
    }
  }

  async destroy(req, res) {
    const id = req.params.id;
    try {
      const associacao = await UsuarioLivro.findByPk(id);
      if (!associacao) {
        return res.status(404).json({ error: 'Associação não encontrada' });
      }
      await associacao.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar associação' });
    }
  }
}

module.exports = new UsuarioLivroController();
