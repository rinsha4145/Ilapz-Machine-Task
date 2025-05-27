import express from 'express';
import path from 'path';
import multer from 'multer';
import {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  searchProduct,
  getBrands,
  getMaterials,
  getcategory
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
router
.post('/search',searchProduct)
.post('/brands',getBrands)
.post('/materials',getMaterials)
.get('/categories',getcategory)
.get('/', getAllProducts)
.get('/:id', getProductById)
.post('/', adminAuthMiddleware, upload.single('image'), createProduct)
.put('/:id', adminAuthMiddleware, upload.single('image'), updateProduct)
.delete('/:id', adminAuthMiddleware, deleteProduct)

export default router
