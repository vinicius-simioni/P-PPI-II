const { Mensagem } = require("../models");
const { Op, Sequelize } = require("sequelize");
const { sequelize } = require("../models");

class MensagemController {
  async enviarMensagem(req, res) {
    const { texto, id_receptor } = req.body;
    const id_emissor = req.user_id; // Id do Middleware

    if (!id_receptor || !texto) {
      return res
        .status(400)
        .json({ error: "Receptor e texto são necessários" });
    }

    try {
      const novaMensagem = await Mensagem.create({
        texto,
        id_emissor,
        id_receptor,
      });
      res.status(201).json(novaMensagem);
    } catch (error) {
      console.log(error);
      res.status(500).json({ error: "Erro ao enviar mensagem" });
    }
  }

  async listarMensagens(req, res) {
    const id_emissor = req.user_id;
    const { id_receptor } = req.query;

    console.log("Listar Mensagens");

    if (!id_receptor) {
      return res.status(400).json({ error: "Receptor é necessário" });
    }

    try {
      const mensagens = await Mensagem.findAll({
        where: {
          [Op.or]: [
            { id_emissor, id_receptor },
            { id_emissor: id_receptor, id_receptor: id_emissor },
          ],
        },
        order: [["createdAt", "ASC"]],
      });

      res.status(200).json(mensagens);
    } catch (error) {
      res.status(500).json({ error: "Erro ao listar mensagens" });
    }
  }

  async historicoMensagens(req, res) {
    const id_receptor = req.params.id;
    const id_emissor = req.user_id;

    // console.log("Receptor:", id_receptor, "Emissor:", id_emissor);

    try {
      const mensagens = await sequelize.query(
        `SELECT * 
         FROM mensagem
         WHERE 
           (id_emissor = :id_emissor AND id_receptor = :id_receptor)
           OR (id_emissor = :id_receptor AND id_receptor = :id_emissor)
         ORDER BY createdAt ASC`,
        {
          replacements: { id_emissor, id_receptor },
          type: Sequelize.QueryTypes.SELECT, // Tipo de query para SELECT
        }
      );

      // console.log("Mensagens retornadas:", mensagens);

      res.json(mensagens);
    } catch (error) {
      console.error("Erro ao carregar histórico:", error);
      res.status(500).json({ message: "Erro ao carregar histórico." });
    }
  }

  async listarChats(req, res) {
    console.log("Rodando listarChats");
    const id_usuario = req.user_id;

    try {
      const chats = await sequelize.query(
        `SELECT 
          outro_usuario.id AS id,
          outro_usuario.nome AS nome,
          m.texto AS ultimaMensagem,
          m.createdAt AS dataUltimaMensagem
       FROM mensagem m
       INNER JOIN usuarios AS outro_usuario ON 
           (m.id_emissor = :id_usuario AND outro_usuario.id = m.id_receptor)
           OR (m.id_receptor = :id_usuario AND outro_usuario.id = m.id_emissor)
       WHERE m.createdAt = (
           SELECT MAX(createdAt)
           FROM mensagem
           WHERE 
             (id_emissor = m.id_emissor AND id_receptor = m.id_receptor)
             OR (id_emissor = m.id_receptor AND id_receptor = m.id_emissor)
       )
       ORDER BY m.createdAt DESC`,
        {
          replacements: { id_usuario }, 
          type: Sequelize.QueryTypes.SELECT, 
        }
      );

      res.json(chats);
    } catch (error) {
      console.error("Erro ao listar chats:", error);
      res.status(500).json({ message: "Erro ao listar chats." });
    }
  }
}

module.exports = new MensagemController();