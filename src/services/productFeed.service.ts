import { Product, ProductFeedResponse } from '../types/ucp.types';
import * as fs from 'fs/promises';
import * as path from 'path';

class ProductFeedService {
  private products: Map<string, Product> = new Map();
  private dataFilePath = path.join(__dirname, '../../data/products.json');
  private initialized = false;

  private async ensureInitialized(): Promise<void> {
    if (!this.initialized) {
      await this.loadData();
      this.initialized = true;
    }
  }

  private async loadData(): Promise<void> {
    try {
      const data = await fs.readFile(this.dataFilePath, 'utf-8');
      const json = JSON.parse(data);
      this.products.clear();
      for (const product of json.products) {
        this.products.set(product.id, product);
      }
      console.log(`Loaded ${this.products.size} products from file`);
    } catch (error) {
      console.log('No existing data file found or error reading file, starting with empty catalog');
      this.products.clear();
    }
  }

  private async saveData(): Promise<void> {
    try {
      const products = Array.from(this.products.values());
      const data = JSON.stringify({ products }, null, 2);
      await fs.mkdir(path.dirname(this.dataFilePath), { recursive: true });
      await fs.writeFile(this.dataFilePath, data, 'utf-8');
    } catch (error) {
      console.error('Error saving data:', error);
      throw new Error('Failed to save product data');
    }
  }

  async addProducts(products: Product[]): Promise<ProductFeedResponse> {
    await this.ensureInitialized();
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

    await this.saveData();

    return {
      success: errors.length === 0,
      message: errors.length === 0 ? 'All products processed successfully' : 'Some products failed to process',
      itemsProcessed,
      errors: errors.length > 0 ? errors : undefined,
    };
  }

  async getProduct(productId: string): Promise<Product | null> {
    await this.ensureInitialized();
    return this.products.get(productId) || null;
  }

  async getAllProducts(): Promise<Product[]> {
    await this.ensureInitialized();
    return Array.from(this.products.values());
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product | null> {
    await this.ensureInitialized();
    const product = this.products.get(productId);
    if (!product) {
      return null;
    }

    const updatedProduct = { ...product, ...updates, id: product.id };
    this.validateProduct(updatedProduct);
    this.products.set(productId, updatedProduct);
    await this.saveData();
    return updatedProduct;
  }

  async deleteProduct(productId: string): Promise<boolean> {
    await this.ensureInitialized();
    const deleted = this.products.delete(productId);
    if (deleted) {
      await this.saveData();
    }
    return deleted;
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
