import express from 'express';
import clientController from '../controllers/clientController.js';

const router = express.Router();

router.post('/', clientController.addClient);
router.get('/', clientController.getClients);
router.delete('/:id', clientController.deleteClient);

export default router;
