import { Request, Response } from 'express';
import productFeedService from '../services/productFeed.service';
import { Product } from '../types/ucp.types';

export class ProductFeedController {
  async addProducts(req: Request, res: Response): Promise<void> {
    try {
      const { products } = req.body;

      if (!Array.isArray(products)) {
        res.status(400).json({
          success: false,
          message: 'Products must be an array',
        });
        return;
      }

      const result = await productFeedService.addProducts(products);
      const statusCode = result.success ? 200 : 207; // 207 Multi-Status for partial success
      res.status(statusCode).json(result);
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId as string;
      const product = await productFeedService.getProduct(productId);

      if (!product) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.json({
        success: true,
        product,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async getAllProducts(req: Request, res: Response): Promise<void> {
    try {
      const products = await productFeedService.getAllProducts();
      res.json({
        success: true,
        count: products.length,
        products,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async updateProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId as string;
      const updates: Partial<Product> = req.body;

      const updatedProduct = await productFeedService.updateProduct(productId, updates);

      if (!updatedProduct) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }

  async deleteProduct(req: Request, res: Response): Promise<void> {
    try {
      const productId = req.params.productId as string;
      const deleted = await productFeedService.deleteProduct(productId);

      if (!deleted) {
        res.status(404).json({
          success: false,
          message: 'Product not found',
        });
        return;
      }

      res.json({
        success: true,
        message: 'Product deleted successfully',
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: error instanceof Error ? error.message : 'Internal server error',
      });
    }
  }
}

export default new ProductFeedController();
