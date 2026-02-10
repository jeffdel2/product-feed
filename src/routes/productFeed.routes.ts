import { Router } from 'express';
import productFeedController from '../controllers/productFeed.controller';

const router = Router();

// Product feed endpoints
router.post('/products', productFeedController.addProducts.bind(productFeedController));
router.get('/products', productFeedController.getAllProducts.bind(productFeedController));
router.get('/products/:productId', productFeedController.getProduct.bind(productFeedController));
router.put('/products/:productId', productFeedController.updateProduct.bind(productFeedController));
router.delete('/products/:productId', productFeedController.deleteProduct.bind(productFeedController));

export default router;
