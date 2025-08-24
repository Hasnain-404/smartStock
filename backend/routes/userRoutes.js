import express from 'express';
const router = express.Router();
import userController from '../controllers/userController.js';


// Define routes
router.get('/user', userController.getAllUsers);
router.get('/:id', userController.getUserById);
router.post('/createUser', userController.createUser);
router.put('/:id', userController.updateUser);
router.delete('/:id', userController.deleteUser);

export default router;