const { Op } = require("sequelize");
const { Troca, Livro, Usuario, sequelize } = require("../models");

class TrocaController {
  async criarTroca(req, res) {
    try {
      const id_remetente = req.user_id;

      console.log(req.body);

      const {
        id_destinatario,
        id_livro_proposto,
        id_livro_interesse,
        data,
        texto_proposta,
      } = req.body;

      // Verificar se o livro proposto e o livro de interesse existem
      const livroProposto = await Livro.findByPk(id_livro_proposto);
      const livroInteresse = await Livro.findByPk(id_livro_interesse);
      const usuarioRemetente = await Usuario.findByPk(id_remetente);
      const usuarioDestinatario = await Usuario.findByPk(id_destinatario);

      if (!livroProposto || !livroInteresse) {
        return res.status(400).json({
          error: "Livro proposto ou livro de interesse não encontrado",
        });
      }

      if (!usuarioRemetente || !usuarioDestinatario) {
        return res
          .status(400)
          .json({ error: "Usuário remetente ou destinatário não encontrado" });
      }

      // Criar a troca no banco de dados
      const troca = await Troca.create({
        id_remetente,
        id_destinatario,
        id_livro_proposto,
        id_livro_interesse,
        data,
        texto_proposta,
      });

      return res.status(201).json(troca);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao criar a troca" });
    }
  }

  async atualizarTroca(req, res) {
    try {
      const { id } = req.params;
      const {
        id_remetente,
        id_destinatario,
        id_livro_proposto,
        id_livro_interesse,
        data,
        texto_proposta,
      } = req.body;

      // Verificar se a troca existe
      const troca = await Troca.findByPk(id);
      if (!troca) {
        return res.status(404).json({ error: "Troca não encontrada" });
      }

      // Atualizar os campos da troca
      troca.id_remetente = id_remetente || troca.id_remetente;
      troca.id_destinatario = id_destinatario || troca.id_destinatario;
      troca.id_livro_proposto = id_livro_proposto || troca.id_livro_proposto;
      troca.id_livro_interesse = id_livro_interesse || troca.id_livro_interesse;
      troca.data = data || troca.data;
      troca.texto_proposta = texto_proposta || troca.texto_proposta;

      await troca.save();

      return res.status(200).json(troca);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao atualizar a troca" });
    }
  }

  async listarTrocasRecebidas(req, res) {
    try {
      const id_usuario = req.user_id;

      const sql = `
        SELECT 
          t.id,
          t.id_remetente AS usuario_remetente, 
          ur.nome AS nome_remetente, 
          t.id_destinatario, 
          ud.nome AS nome_destinatario,
          t.id_livro_proposto,
          lp.titulo AS titulo_proposto,
          t.id_livro_interesse,
          li.titulo AS titulo_interesse,
          t.data,
          t.texto_proposta,
          t.status
        FROM trocas t
        JOIN usuarios ur ON ur.id = t.id_remetente
        JOIN usuarios ud ON ud.id = t.id_destinatario
        JOIN livros lp ON t.id_livro_proposto = lp.id
        JOIN livros li ON t.id_livro_interesse = li.id
        WHERE t.id_destinatario = :id_destinatario;
      `;

      const resultados = await sequelize.query(sql, {
        replacements: { id_destinatario: id_usuario }, 
        type: sequelize.QueryTypes.SELECT, 
      });

      console.log(resultados);

      if (!Array.isArray(resultados)) {
        resultados = Object.values(resultados); // Se for um objeto, converte para array
      }

      return res.status(200).json(resultados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar as trocas" });
    }
  }

  async listarTrocasEnviadas(req, res) {
    try {
      const id_usuario = req.user_id;

      const sql = `
        SELECT 
          t.id,
          t.id_remetente AS usuario_remetente, 
          ur.nome AS nome_remetente, 
          t.id_destinatario, 
          ud.nome AS nome_destinatario,
          t.id_livro_proposto,
          lp.titulo AS titulo_proposto,
          t.id_livro_interesse,
          li.titulo AS titulo_interesse,
          t.data,
          t.texto_proposta,
          t.status
        FROM trocas t
        JOIN usuarios ur ON ur.id = t.id_remetente
        JOIN usuarios ud ON ud.id = t.id_destinatario
        JOIN livros lp ON t.id_livro_proposto = lp.id
        JOIN livros li ON t.id_livro_interesse = li.id
        WHERE t.id_remetente = :id_remetente;
      `;

      const resultados = await sequelize.query(sql, {
        replacements: { id_remetente: id_usuario }, 
        type: sequelize.QueryTypes.SELECT, 
      });

      console.log(resultados);

      if (!Array.isArray(resultados)) {
        resultados = Object.values(resultados); // Se for um objeto, converte para array
      }

      return res.status(200).json(resultados);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar as trocas" });
    }
  }

  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body; // recebe ou 'aceita' ou 'recusada'

      console.log(id)

      // Verificar se o status é válido
      if (!["aceita", "recusada", "pendente"].includes(status)) {
        return res.status(400).json({ error: "Status inválido" });
      }

      // Encontrar a troca
      const troca = await Troca.findByPk(id);
      if (!troca) {
        return res.status(404).json({ error: "Troca não encontrada" });
      }

      // Verificar se o usuário logado é o destinatário da troca
      if (troca.id_destinatario !== req.user_id) {
        return res.status(403).json({
          error: "Você não tem permissão para aceitar ou recusar esta troca",
        });
      }

      // Atualizar o status da troca
      troca.status = status;
      await troca.save();

      return res.status(200).json(troca);
    } catch (error) {
      console.error(error);
      return res
        .status(500)
        .json({ error: "Erro ao atualizar o status da troca" });
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

module.exports = new TrocaController();
