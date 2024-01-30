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
  getAllTasks: async (req, res) => {
    try {
      // Utilizar el método find de Mongoose para obtener todos las tareas de la base de datos
      const tasks = await Task.find();
      // Responder con las tareas encontradas y el código 200 (OK)
      res.status(200).json(tasks);
    } catch (error) {
      // Manear cualquier error y responder con un menbsaje de error y el código de estado 500 (Interval Server Error)
      res.status(500).json({
        message: error.message
      });
    }
  },
  // Obtener una Tarea por ID

  // Actualizar una Tarea

  // Eliminar una tarea por ID
};

module.exports = taskController;
//* then y catch