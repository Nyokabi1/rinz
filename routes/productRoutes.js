import express from 'express';
import multer from 'multer';
import productController from '../controllers/productController.js';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('image'), productController.addProduct);
router.get('/', productController.getProducts);
router.delete('/:id', productController.deleteProduct);

export default router;
