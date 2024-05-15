import express from 'express';
const router = express.Router();
import * as taskController from '../controllers/taskController.js';

router.get('/', taskController.getAllTasks);
router.post('/', taskController.createTask);
router.get('/:id', taskController.getById);
router.put('/:id', taskController.updateTask); 
router.delete('/:id', taskController.deleteTask); 

export default router;

