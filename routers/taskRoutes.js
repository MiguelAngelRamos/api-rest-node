const { Router } = require('express');
const router = Router();
const taskController = require('../controllers/taskController');

// Crear una tarea
router.post('/', taskController.createTask);

module.exports = router;
