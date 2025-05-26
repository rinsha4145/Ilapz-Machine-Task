import express from 'express';
import path from 'path';
import multer from 'multer';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct
} from '../controller/product.js';
import { adminAuthMiddleware } from '../middleware/authentication.js';

const router = express.Router();

// Multer config for image uploads
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});
const upload = multer({ storage });

// Routes
router.get('/', getAllProducts);
router.get('/:id', getProductById);
router.post('/', adminAuthMiddleware, upload.single('image'), createProduct);
router.put('/:id', adminAuthMiddleware, upload.single('image'), updateProduct);
router.delete('/:id', adminAuthMiddleware, deleteProduct);

export default router;
