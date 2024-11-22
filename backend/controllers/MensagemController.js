const { Mensagem } = require("../models");
const { Op } = require("sequelize");

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
    const { id_receptor } = req.query;
    const id_remetente = req.user_id; 

    try {
      const mensagens = await Mensagem.findAll({
        where: {
          [Op.or]: [
            { id_remetente, id_receptor },
            { id_remetente: id_receptor, id_receptor: id_remetente },
          ],
        },
        order: [["createdAt", "ASC"]], 
      });
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
      const mensagens = await Mensagem.findAll({
        where: {
          [Op.or]: [
            { id_emissor: id_usuario }, 
            { id_receptor: id_usuario }, 
          ],
        },
        include: [
          {
            model: Usuario,
            as: "emissor",
            attributes: ["id", "nome"], 
          },
          {
            model: Usuario,
            as: "receptor",
            attributes: ["id", "nome"], 
          },
        ],
        order: [["createdAt", "DESC"]], 
      });

      // Processar a lista de mensagens para retornar apenas os chats únicos
      const chats = [];
      const idsConversados = new Set();

      mensagens.forEach((mensagem) => {
        const outroUsuario =
          mensagem.id_emissor === id_usuario
            ? mensagem.receptor 
            : mensagem.emissor; 

        if (!idsConversados.has(outroUsuario.id)) {
          idsConversados.add(outroUsuario.id);
          chats.push({
            id: outroUsuario.id,
            nome: outroUsuario.nome,
            ultimaMensagem: mensagem.texto, 
            dataUltimaMensagem: mensagem.createdAt, 
          });
        }
      });

      res.json(chats);
    } catch (error) {
      console.error("Erro ao listar chats:", error);
      res.status(500).json({ message: "Erro ao listar chats." });
    }
  }
}

module.exports = new MensagemController();
