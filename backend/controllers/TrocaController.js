const { Op } = require("sequelize");
const { Troca, Livro, Usuario } = require("../models");

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

  async listarTrocas(req, res) {
    try {
      const id_usuario = req.user_id; 

      // Buscar todas as trocas nas quais o usuário é o remetente ou o destinatário
      const trocas = await Troca.findAll({
        where: {
          [Op.or]: [
            { id_remetente: id_usuario },
            { id_destinatario: id_usuario }
          ]
        },
        include: [
          {
            model: Livro,
            foreignKey: 'id_livro_proposto',
            attributes: ['titulo'],
          },
          {
            model: Livro,
            foreignKey: 'id_livro_interesse',
            attributes: ['titulo'],
          },
          {
            model: Usuario,
            foreignKey: 'id_remetente',
            attributes: ['nome'],
          },
          {
            model: Usuario,
            foreignKey: 'id_destinatario',
            attributes: ['nome'],
          }
        ]
      });
  
      if (!trocas.length) {
        return res.status(404).json({ message: "Nenhuma troca encontrada" });
      }

      console.log(trocas)
  
      return res.status(200).json(trocas);
    } catch (error) {
      console.error(error);
      return res.status(500).json({ error: "Erro ao listar as trocas" });
    }
  }
}

module.exports = new TrocaController();
