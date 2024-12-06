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
      const id_usuario = req.user_id;

      const livros = await Livro.findAll({
        where: {
          id_usuario: id_usuario,
          [Op.and]: [
            {
              id: {
                [Op.notIn]: sequelize.literal(`
                  (SELECT id_livro_proposto FROM trocas WHERE status = 'aceita')
                `),
              },
            },
            {
              id: {
                [Op.notIn]: sequelize.literal(`
                  (SELECT id_livro_interesse FROM trocas WHERE status = 'aceita')
                `),
              },
            },
            {
              titulo: {
                [Op.notIn]: sequelize.literal(`
                  (SELECT lv.titulo 
                   FROM trocas t
                   JOIN livros lv 
                   ON lv.id_usuario = t.id_destinatario and t.status = 'aceita'
                   OR lv.id_usuario = t.id_remetente and t.status = 'aceita')
                `),
              },
            },
          ],
        },
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
        (:cidade IS NULL OR u.cidade LIKE :cidade) AND
        l.status = 'D';
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

  async getSugestoes(req, res) {
    try {
      const id_usuario = req.user_id;

      //obter usuário
      const usuario = await Usuario.findByPk(id_usuario);
      if (!usuario || !usuario.cidade) {
        return res
          .status(404)
          .json({ error: "Usuário ou cidade não encontrados." });
      }

      //obter livros de interesse do usuário 1
      const livrosInteresseUsuario1 = await Livro.findAll({
        where: {
          id_usuario: id_usuario,
          status: "I", // Livros de interesse
        },
      });

      if (livrosInteresseUsuario1.length === 0) {
        return res
          .status(404)
          .json({ error: "Usuário não possui livros de interesse." });
      }

      // Obter títulos de interesse
      const titulosInteresse = livrosInteresseUsuario1.map(
        (livro) => livro.titulo
      );

      //obter livros com o mesmo título disponíveis na mesma cidade
      const livrosDisponiveisMesmaCidade = await sequelize.query(
        `
        SELECT 
          l.id AS id_livro, 
          l.titulo, 
          l.status,
          l.id_usuario as id_proprietario,
          u.nome AS nome_proprietario 
        FROM livros l
        JOIN usuarios u ON u.id = l.id_usuario
        WHERE u.cidade = :cidade
          AND u.id != :id_usuario
          AND l.status = 'D'
          AND l.titulo IN (:titulosInteresse)
          AND l.id NOT IN (select id_livro_proposto from trocas)
          AND l.id NOT IN (select id_livro_interesse from trocas)
          AND l.titulo not in (select lv.titulo from trocas t
                              join livros lv 
                              on lv.id_usuario = t.id_destinatario
                              or lv.id_usuario = t.id_remetente)
        `,
        {
          replacements: {
            cidade: usuario.cidade,
            id_usuario: id_usuario,
            titulosInteresse: titulosInteresse,
          },
          type: sequelize.QueryTypes.SELECT,
        }
      );

      //obter livros de disponíveis do usuário 1
      const livrosDisponiveisUsuario1 = await Livro.findAll({
        where: {
          id_usuario: id_usuario,
          status: "D", // Livros disponíveis
        },
      });

      const titulosLivrosDisponiveisUsuario1 = livrosDisponiveisUsuario1.map(
        (livro) => livro.titulo
      );
      console.log(titulosLivrosDisponiveisUsuario1);

      //limpar array para match
      const matchArray = [];
      const interessesMutuos = [];
      for (const e of livrosDisponiveisMesmaCidade) {
        console.log(e.id_proprietario);
        //busca livros de interesse de cada proprietário
        const livrosInteresseProprietario = await Livro.findAll({
          where: {
            id_usuario: e.id_proprietario,
            status: "I", // Livros de interesse
          },
        });

        // Converte os resultados em objetos puros
        const livrosInteresseProprietarioPuros =
          livrosInteresseProprietario.map((livro) =>
            livro.get({ plain: true })
          );

        const titulosLivrosInteresseProprietario =
          livrosInteresseProprietario.map((livro) => livro.titulo);
        console.log("Títulos de Interesse do Proprietário:");
        console.log(titulosLivrosInteresseProprietario);

        const interesseMutuo = titulosLivrosInteresseProprietario.some(
          (titulo) => titulosLivrosDisponiveisUsuario1.includes(titulo)
        );

        if (interesseMutuo) {
          console.log("Há um interesse mútuo em pelo menos um livro.");
          matchArray.push(e);
          interessesMutuos.push(livrosInteresseProprietarioPuros);
        } else {
          console.log("Não há interesse mútuo em livros.");
        }
      }

      return res.status(200).json({ matchArray, interessesMutuos });
    } catch (error) {
      console.error("Erro ao buscar sugestões:", error);
      res.status(500).json({ error: "Erro ao buscar sugestões" });
    }
  }
}

module.exports = new LivroController();
