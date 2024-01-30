const Task = require('../models/Task');

const taskController = {

  // Crear una nueva tarea
  createTask: async (req, res) => {
    try {
      const { titulo, descripcion, estado, fechaVencimiento } = req.body;
      // Verificar si la fecha vencimiento esta presente en la solicitud
      // if(false) if(true)
      // null -> !null = true
      if(!fechaVencimiento) {
        throw new Error('Fecha de vencimiento no proporcionada');
      }
      // Convertir la fecha a formato ISO8601
      const fechaVencimientoISO8601 = new Date(fechaVencimiento).toISOString();
      // Crear la tarea con la fecha en formato ISO8601
      const newTask = new Task({titulo, descripcion, estado, fechaVencimiento: fechaVencimientoISO8601});
      
      // Guardar la tarea en la base de dates
      await newTask.save();

      // Responder con la tarea creada 201(Created)
      res.status(201).json(newTask);

    } catch (error) {
      // 400 Bad request
      res.status(400).json({ message: error.message })
    }
  },
  // Obtener Todas las tareas

  // Obtener una Tarea por ID

  // Actualizar una Tarea

  // Eliminar una tarea por ID
};

module.exports = taskController;
//* then y catch