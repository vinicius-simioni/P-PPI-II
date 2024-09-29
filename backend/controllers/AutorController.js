const { Autor } = require('../models'); 

class AutorController {
  async index(req, res) {
    try {
      const autores = await Autor.findAll(); 
      res.status(200).json(autores);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar autores' });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const autor = await Autor.findByPk(id); 
      if (!autor) {
        return res.status(404).json({ error: 'Autor não encontrado' });
      }
      res.status(200).json(autor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao buscar autor' });
    }
  }

  async store(req, res) {
    const { nome } = req.body;
    try {
      const novoAutor = await Autor.create({ nome }); 
      res.status(201).json(novoAutor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao criar autor' });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { nome } = req.body;
    try {
      const autor = await Autor.findByPk(id); 
      if (!autor) {
        return res.status(404).json({ error: 'Autor não encontrado' });
      }
      autor.nome = nome; 
      await autor.save(); 
      res.status(200).json(autor);
    } catch (error) {
      res.status(500).json({ error: 'Erro ao atualizar autor' });
    }
  }

  async destroy(req, res) {
    const id = req.params.id;
    try {
      const autor = await Autor.findByPk(id); 
      if (!autor) {
        return res.status(404).json({ error: 'Autor não encontrado' });
      }
      await autor.destroy(); 
      res.status(204).send(); 
    } catch (error) {
      res.status(500).json({ error: 'Erro ao deletar autor' });
    }
  }
}

module.exports = new AutorController();
