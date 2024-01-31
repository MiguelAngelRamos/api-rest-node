const express = require('express');
const mongoose = require('mongoose'); // ORM
const cors = require('cors');
const jwt = require('jsonwebtoken');
const taskRoutes = require('./routers/taskRoutes');
const authRoutes = require('./routers/authRoutes');
require('dotenv').config();

const app = express();

// Middlware de Cors y parase JSON
app.use(cors());
app.use(express.json());

// Conexión hacia la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch( () => console.error('No se pudo conectar a MongoDB'));


// Middleware de autenticación
const autheticateToken = (req, res, next) => {
  const token = req.header('Authorization');

  if(!token) {
    return res.status(401).json({ message: 'Token de autenticación no proporcionado'});
  }

  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    if(err) {
      return res.status(403).json({ message: 'Token no autenticación no válido'});
    }
    console.log(user);
    req.user = user;
    next();
  })
} 
// Registro de usuarios
app.use('/api/users', authRoutes);
// Registro de las rutas
//* http://localhost:3000/api/tasks
app.use('/api/tasks', autheticateToken, taskRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // alt + 96 código ascii
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


