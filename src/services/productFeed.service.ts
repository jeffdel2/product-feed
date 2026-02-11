import { Product, ProductFeedResponse } from '../types/ucp.types';
import { supabase } from '../config/supabase';

class ProductFeedService {
  private readonly tableName = 'products';

  async addProducts(products: Product[]): Promise<ProductFeedResponse> {
    const errors: Array<{ productId: string; error: string }> = [];
    let itemsProcessed = 0;

    for (const product of products) {
      try {
        this.validateProduct(product);

        // Upsert product (insert or update if exists)
        const { error } = await supabase
          .from(this.tableName)
          .upsert({
            id: product.id,
            title: product.title,
            description: product.description,
            price: product.price,
            availability: product.availability,
            link: product.link,
            image_link: product.image_link,
            brand: product.brand,
            gtin: product.gtin,
            mpn: product.mpn,
            condition: product.condition,
            category: product.category,
          });

        if (error) {
          throw error;
        }

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
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .eq('id', productId)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Product;
  }

  async getAllProducts(): Promise<Product[]> {
    const { data, error } = await supabase
      .from(this.tableName)
      .select('*')
      .order('id', { ascending: true });

    if (error || !data) {
      return [];
    }

    return data as Product[];
  }

  async updateProduct(productId: string, updates: Partial<Product>): Promise<Product | null> {
    // First, get the existing product
    const existingProduct = await this.getProduct(productId);
    if (!existingProduct) {
      return null;
    }

    // Merge updates with existing product
    const updatedProduct = { ...existingProduct, ...updates, id: productId };
    this.validateProduct(updatedProduct);

    // Update in Supabase
    const { data, error } = await supabase
      .from(this.tableName)
      .update({
        title: updatedProduct.title,
        description: updatedProduct.description,
        price: updatedProduct.price,
        availability: updatedProduct.availability,
        link: updatedProduct.link,
        image_link: updatedProduct.image_link,
        brand: updatedProduct.brand,
        gtin: updatedProduct.gtin,
        mpn: updatedProduct.mpn,
        condition: updatedProduct.condition,
        category: updatedProduct.category,
      })
      .eq('id', productId)
      .select()
      .single();

    if (error || !data) {
      return null;
    }

    return data as Product;
  }

  async deleteProduct(productId: string): Promise<boolean> {
    const { error } = await supabase
      .from(this.tableName)
      .delete()
      .eq('id', productId);

    return !error;
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
