import express from 'express';
import {
    getProducts,
    createProduct,
    getSingleProduct,
    updateProduct,
    deleteProduct,
    searchForProduct,
    deleteAllProduct
} from '../controllers/product.controller.js';

const router = express.Router();

router.route('/')
    .get(getProducts)
    .post(createProduct)
    .delete(deleteAllProduct);

router.route('/:productId')
    .get(getSingleProduct)
    .put(updateProduct)
    .delete(deleteProduct);

router.route('/search/:productName')
    .get(searchForProduct)

export default router;