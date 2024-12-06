const { Usuario, Avaliacao } = require('../models');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = '98fda@7s9f89saf98as8f!@#a8sdf@678!@#056456@63!@#$%';

class UsuarioController {
  async create(req, res) {
    
    try {
      const { nome, email, senha, cidade } = req.body;

      if (!nome || nome.trim() === '') {
        return res.status(400).json({ error: 'Nome é obrigatório' });
      }

      const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
      if (!email || !emailRegex.test(email)) {
        return res.status(400).json({ error: 'Email inválido' });
      }

      if (!senha || senha.length < 6) {
        return res.status(400).json({ error: 'Senha deve ter no mínimo 6 caracteres' });
      }

      if (!cidade || cidade.trim() === '') {
        return res.status(400).json({ error: 'Cidade é obrigatória' });
      }

      const existingUser = await Usuario.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      const newUser = await Usuario.create({
        nome,
        email,
        senha: hashedPassword,
        cidade,
      });
      res.status(201).json(newUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async login(req, res) {
    await body('email').isEmail().withMessage('O email é inválido').run(req);
    await body('senha').notEmpty().withMessage('A senha deve possuir ao menos 6 caracteres').run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, senha } = req.body


    try {
      const user = await Usuario.findOne({ where: { email } });

      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }

      const isMatch = await bcrypt.compare(senha, user.senha);
      if (!isMatch) {
        return res.status(401).json({ error: 'Senha inválida' });
      }

      const payload = { id: user.id, email: user.email };
      const token = jwt.sign(payload, jwtSecret, { expiresIn: '1h' });

      res.json({ token });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async update(req, res) {
    console.log('pediu para atualizar')
    const { nome, cidade } = req.body; 
    const userId = req.user_id; 
  
    try {
      const user = await Usuario.findByPk(userId);
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      await user.update({ nome, cidade }); 
  
      res.json({ message: 'Informações atualizadas com sucesso', user });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getById(req, res) {
    const userId = req.user_id; 
  
    try {
      const user = await Usuario.findByPk(userId, {
        attributes: ['id', 'nome', 'email', 'cidade'], 
      });
  
      if (!user) {
        return res.status(404).json({ error: 'Usuário não encontrado' });
      }
  
      res.json(user); 
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getPerfil(req, res) {
    try {
      // Pega o id do usuário da URL
      const usuarioId = req.params.id;

      // Busca os dados do usuário
      const usuario = await Usuario.findByPk(usuarioId);
      if (!usuario) {
        return res.status(404).json({ error: "Usuário não encontrado" });
      }
  
      // Busca as avaliações do usuário
      const avaliacoes = await Avaliacao.findAll({
        where: { id_usuario_avaliado: usuarioId },
      });
      
      // Retorna o perfil do usuário e suas avaliações
      return res.json({
        usuario,
        avaliacoes,
      });
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: "Erro ao buscar perfil" });
    }
  };
  
}

module.exports = new UsuarioController();
