import express from 'express';
const router = express.Router();
import * as userController from '../controllers/userController.js';
import * as authController from '../controllers/authControllers.js';

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.get('/:id', userController.getById);
router.put('/:id/:userData', userController.updateUser); 
router.delete('/:id', userController.deleteUser); 

router.post('/login', authController.login)
router.post('/private', authController.verificarToken, userController.autenticadedRoute)

export default router;

