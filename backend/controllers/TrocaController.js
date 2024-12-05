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
      const id_usuario = req.user_id; // ID do usuário que faz a requisição

      // Consulta SQL pura
      const sql = `
        SELECT 
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

  async atualizarStatus(req, res) {
    try {
      const { id } = req.params;
      const { status } = req.body; // recebe ou 'aceita' ou 'recusada'

      // Verificar se o status é válido
      if (!["aceita", "recusada"].includes(status)) {
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
}

module.exports = new TrocaController();
