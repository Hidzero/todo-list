import express from 'express';
const router = express.Router();
import * as carController from '../controllers/carController.js';

router.get('/', carController.getAllCars);
router.post('/', carController.createCar);
router.get('/:id', carController.getById);
router.put('/:id/:carData', carController.updateCar); 
router.delete('/:id', carController.deleteCar); 

export default router;

