import { Request } from 'express';
import { config } from '../config';

export function getBaseUrl(req: Request): string {
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}`;
}

export function buildProductUrl(req: Request, productId: string): string {
  return `${getBaseUrl(req)}/products/${productId}`;
}

export function buildImageUrl(productId: string): string {
  // Use Supabase storage URL for images
  const supabaseUrl = config.supabase.url;
  return `${supabaseUrl}/storage/v1/object/public/product-images/${productId}.png`;
}
