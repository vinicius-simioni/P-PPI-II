const { Mensagem } = require("../models");
const { Op } = require("sequelize");

class MensagemController {
  async enviarMensagem(req, res) {
    const { texto, id_receptor } = req.body;
    const id_emissor = req.user_id;  // Id do Middleware

    if (!id_receptor || !texto) {
      return res.status(400).json({ error: 'Receptor e texto são necessários' });
    }

    try {
      const novaMensagem = await Mensagem.create({
        texto,
        id_emissor,
        id_receptor,
      });
      res.status(201).json(novaMensagem); 
    } catch (error) {
      console.log(error)
      res.status(500).json({ error: 'Erro ao enviar mensagem' });
    }
  }

  async listarMensagens(req, res) {
    const id_emissor = req.user_id; 
    const { id_receptor } = req.query;

    if (!id_receptor) {
      return res.status(400).json({ error: 'Receptor é necessário' });
    }

    try {
      const mensagens = await Mensagem.findAll({
        where: {
          [Op.or]: [
            { id_emissor, id_receptor },
            { id_emissor: id_receptor, id_receptor: id_emissor }
          ]
        },
        order: [['createdAt', 'ASC']],  
      });

      res.status(200).json(mensagens); 
    } catch (error) {
      res.status(500).json({ error: 'Erro ao listar mensagens' });
    }
  }
}

module.exports = new MensagemController();
