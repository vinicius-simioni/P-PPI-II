const { Usuario } = require('../models');
const bcrypt = require('bcrypt');
const { body, validationResult } = require('express-validator');
const jwt = require('jsonwebtoken');
const jwtSecret = '98fda@7s9f89saf98as8f!@#a8sdf@678!@#056456@63!@#$%';

class UsuarioController {
  async create(req, res) {
    await body('nome').notEmpty().withMessage('O campo nome é obrigatório').run(req);
    await body('email').isEmail().withMessage('O email é inválido').run(req);
    await body('senha')
      .isLength({ min: 6 })
      .withMessage('A senha deve possuir ao menos 6 caracteres')
      .run(req);

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const { nome, email, senha } = req.body;

      const existingUser = await Usuario.findOne({ where: { email } });
      if (existingUser) {
        return res.status(400).json({ error: 'Email já está em uso' });
      }

      const hashedPassword = await bcrypt.hash(senha, 10);

      const newUser = await Usuario.create({
        nome,
        email,
        senha: hashedPassword,
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
}

module.exports = new UsuarioController();
