const { Router } = require('express');
const router = Router();
const taskController = require('../controllers/taskController');

// Crear una tarea
router.post('/', taskController.createTask);

// Obtener todas las tareas
router.get('/', taskController.getAllTasks);

// Obtener una tarea por ID
router.get('/:id', taskController.getTaskById);

// Actualizar una tarea por ID
router.put('/:id', taskController.updateTask);

module.exports = router;
