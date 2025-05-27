import express from 'express';

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
import { upload } from '../middleware/upload.js';

const router = express.Router();

// Routes
router
.post('/search',searchProduct)
.post('/brands',getBrands)
.post('/materials',getMaterials)
.get('/categories',getcategory)
.get('/', getAllProducts)
.get('/:id', getProductById)
.post('/add', adminAuthMiddleware, upload.array('image', 5), createProduct)
.put('/update/:id', adminAuthMiddleware, upload.array('image', 5), updateProduct)
.put('/delete/:id', adminAuthMiddleware, deleteProduct)

export default router
