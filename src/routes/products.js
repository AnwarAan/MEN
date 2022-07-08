import express from 'express';
import products from '../controller/products.js';


const router = express.Router();


router.get('/products', products.getProduct)
router.post('/products',products.postProduct)


export default router;