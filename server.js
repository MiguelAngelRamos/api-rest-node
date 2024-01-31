const express = require('express');
const mongoose = require('mongoose'); // ORM
const cors = require('cors');
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

// Registro de usuarios
app.use('/api/users', authRoutes);
// Registro de las rutas
//* http://localhost:3000/api/tasks
app.use('/api/tasks', taskRoutes);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // alt + 96 código ascii
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


