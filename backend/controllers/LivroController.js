const { Livro } = require('../models');

class LivroController {
  async index(req, res) {
    try {
      const livros = await Livro.findAll();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livros' });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar livro' });
    }
  }

  async store(req, res) {
    const { titulo, autor } = req.body;

    //acessando id do middleware
    const id_usuario = req.user_id;

    console.log(req.body)
    console.log(id_usuario)
    return

    try {
      const novoLivro = await Livro.create({ titulo, autor, id_usuario });
      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar livro' });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { titulo, id_autor, id_editora } = req.body;
    try {
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      livro.titulo = titulo;
      livro.id_autor = id_autor;
      livro.id_editora = id_editora;
      await livro.save();
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar livro' });
    }
  }

  async destroy(req, res) {
    const id = req.params.id;
    try {
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: 'Livro não encontrado' });
      }
      await livro.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar livro' });
    }
  }
}

module.exports = new LivroController();
