const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/User');
require('dotenv').config();

const generateToken = (user) => {
  // Generar un JWT con la información del usuario y la clave secreta de la variable de entorno
  return jwt.sign(
    {
      id: user._id,
      username: user.username,
      roles: user.roles,
    },
    process.env.JWT_SECRET,
    { expiresIn: '1hr'}
  );
};

const authController = {

  register: async (req, res) => {
    try {
      // Crear un nuevo usuario, con los datos del cuerpo de la solicitud req.body
      const newUser = new User(req.body);
      await newUser.save();
      const token = generateToken(newUser);

      res.status(201).json({token, user: newUser});
    } catch (error) {
      res.status(400).json({ message: error.message})
    }
  },

  login: async (req, res) => {
    try {
      const { email, password } = req.body;
      // Buscar al usuario por correo electronico
      const user  = await User.findOne({email});
      if(!user) {
        return res.status(401).json({ message: 'Usuario no encontrado'});
      }

      // Verificar contraseña
      const passwordMatch = await bcrypt.compare(password, user.password);

      if(!passwordMatch) {
        return res.status(401).json({ message: 'Contraseña incorrecta'});
      }

      // Generar el token
      const token = generateToken(user);

      // Responder
      res.status(200).json({token, user});

    } catch (error) {
      res.status(400).json({message: error.message});
    }
  }
};

module.exports = authController;