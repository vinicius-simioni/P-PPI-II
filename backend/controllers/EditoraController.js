const { Editora } = require('../models');

class EditoraController {
  async index(req, res) {
    try {
      const editoras = await Editora.findAll();
      res.status(200).json(editoras);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar editoras' });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const editora = await Editora.findByPk(id);
      if (!editora) {
        return res.status(404).json({ error: 'Editora não encontrada' });
      }
      res.status(200).json(editora);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar editora' });
    }
  }

  async store(req, res) {
    const { nome } = req.body;
    try {
      const novaEditora = await Editora.create({ nome });
      res.status(201).json(novaEditora);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar editora' });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { nome } = req.body;
    try {
      const editora = await Editora.findByPk(id);
      if (!editora) {
        return res.status(404).json({ error: 'Editora não encontrada' });
      }
      editora.nome = nome;
      await editora.save();
      res.status(200).json(editora);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar editora' });
    }
  }

  async destroy(req, res) {
    const id = req.params.id;
    try {
      const editora = await Editora.findByPk(id);
      if (!editora) {
        return res.status(404).json({ error: 'Editora não encontrada' });
      }
      await editora.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar editora' });
    }
  }
}

module.exports = new EditoraController();
