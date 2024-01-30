const { Router } = require('express');
const router = Router();
const taskController = require('../controllers/taskController');

// Crear una tarea
router.post('/', taskController.createTask);

// Obtener todas las tareas
router.get('/', taskController.getAllTasks);
module.exports = router;
