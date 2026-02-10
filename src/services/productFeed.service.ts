import { Product, ProductFeedResponse } from '../types/ucp.types';

class ProductFeedService {
  private products: Map<string, Product> = new Map();

  async addProducts(products: Product[]): Promise<ProductFeedResponse> {
    const errors: Array<{ productId: string; error: string }> = [];
    let itemsProcessed = 0;

    for (const product of products) {
      try {
        this.validateProduct(product);
        this.products.set(product.id, product);
        itemsProcessed++;
      } catch (error) {
        errors.push({
          productId: product.id,
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }
    }

    return {
      success: errors.length === 0,
      message: errors.length === 0 ? 'All products processed successfully' : 'Some products failed to process',
      itemsProcessed,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async getProduct(productId: string): Promise<Product | null> {
    return this.products.get(productId) || null;
  }

  async getAllProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product | null> {
    const product = this.products.get(productId);
    if (!product) {
      return null;
    }

    const updatedProduct = { ...product, ...updates, id: product.id };
    this.validateProduct(updatedProduct);
    this.products.set(productId, updatedProduct);
    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<boolean> {
    return this.products.delete(productId);
  }

  private validateProduct(product: Product): void {
    if (!product.id || typeof product.id !== 'string') {
      throw new Error('Product ID is required and must be a string');
    }
    if (!product.title || typeof product.title !== 'string') {
      throw new Error('Product title is required and must be a string');
    }
    if (!product.price || typeof product.price.value !== 'number' || product.price.value < 0) {
      throw new Error('Product price must be a valid positive number');
    }
    if (!product.price.currency || typeof product.price.currency !== 'string') {
      throw new Error('Product currency is required and must be a string');
    }
    if (!['in_stock', 'out_of_stock', 'preorder', 'backorder'].includes(product.availability)) {
      throw new Error('Product availability must be one of: in_stock, out_of_stock, preorder, backorder');
    }
    if (!product.link || typeof product.link !== 'string') {
      throw new Error('Product link is required and must be a string');
    }
    if (!product.image_link || typeof product.image_link !== 'string') {
      throw new Error('Product image_link is required and must be a string');
    }
  }
}

export default new ProductFeedService();
