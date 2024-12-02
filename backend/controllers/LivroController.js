const { Op } = require("sequelize");
const { Livro, Usuario, sequelize } = require("../models");

class LivroController {
  async index(req, res) {
    try {
      const livros = await Livro.findAll();
      res.status(200).json(livros);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar livros" });
    }
  }

  async findBookByUser(req, res) {
    try {
      // id do usuário extraído do middleware
      const id_usuario = req.user_id;

      const livros = await Livro.findAll({
        where: { id_usuario: id_usuario },
      });

      if (livros.length === 0) {
        return res
          .status(404)
          .json({ message: "Nenhum livro encontrado para este usuário." });
      }

      res.status(200).json(livros);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({ error: "Erro ao buscar livros" });
    }
  }

  async search(req, res) {
    const { titulo, autor, cidade } = req.query;
  
    const sql = `
      SELECT 
        l.*, 
        u.nome AS nome, 
        u.cidade AS cidade
      FROM 
        livros AS l
      JOIN 
        usuarios AS u ON l.id_usuario = u.id
      WHERE 
        (:titulo IS NULL OR l.titulo LIKE :titulo) AND
        (:autor IS NULL OR l.autor LIKE :autor) AND
        (:cidade IS NULL OR u.cidade LIKE :cidade);
    `;
  
    try {
      const [resultados] = await sequelize.query(sql, {
        replacements: {
          titulo: titulo ? `%${titulo}%` : null,
          autor: autor ? `%${autor}%` : null,
          cidade: cidade ? `%${cidade}%` : null,
        },
      });
  
      console.log(resultados);
      res.status(200).json(resultados);
    } catch (error) {
      console.error("Erro ao buscar livros:", error);
      res.status(500).json({ error: "Erro ao buscar livros" });
    }
  }

  async show(req, res) {
    const id = req.params.id;
    try {
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ error: "Erro ao buscar livro" });
    }
  }

  async store(req, res) {
    const { titulo, autor, status } = req.body;
  
    const id_usuario = req.user_id;
  
    try {
      const novoLivro = await Livro.create({
        titulo,
        autor,
        status, 
        id_usuario,
      });
      res.status(201).json(novoLivro);
    } catch (error) {
      res.status(500).json({ error: "Erro ao criar livro" });
    }
  }

  async update(req, res) {
    const id = req.params.id;
    const { titulo, autor, status } = req.body;
    const id_usuario = req.user_id;
  
    try {
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }
  
      livro.titulo = titulo;
      livro.autor = autor;
      livro.status = status;
      livro.id_usuario = id_usuario;
  
      await livro.save();
      res.status(200).json(livro);
    } catch (error) {
      res.status(500).json({ error: "Erro ao atualizar livro" });
    }
  }
  

  async destroy(req, res) {
    const id = req.params.id;
    try {
      const livro = await Livro.findByPk(id);
      if (!livro) {
        return res.status(404).json({ error: "Livro não encontrado" });
      }
      await livro.destroy();
      res.status(204).send();
    } catch (error) {
      res.status(500).json({ error: "Erro ao deletar livro" });
    }
  }
}

module.exports = new LivroController();
