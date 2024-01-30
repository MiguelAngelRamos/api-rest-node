const express = require('express');
const mongoose = require('mongoose'); // ORM
require('dotenv').config();

const app = express();

// Middlware de Cors y parase JSON
app.use(cors());
app.use(express.json());

// Conexión hacia la base de datos MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('Conectado a MongoDB'))
  .catch(err => console.error('No se pudo conectar a MongoDB'), err);


const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
  // alt + 96 código ascii
  console.log(`Servidor corriendo en el puerto ${PORT}`);
});


