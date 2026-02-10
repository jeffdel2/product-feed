import { Request } from 'express';

export function getBaseUrl(req: Request): string {
  const protocol = req.protocol;
  const host = req.get('host');
  return `${protocol}://${host}`;
}

export function buildProductUrl(req: Request, productId: string): string {
  return `${getBaseUrl(req)}/products/${productId}`;
}

export function buildImageUrl(req: Request, imageName: string): string {
  return `${getBaseUrl(req)}/images/${imageName}`;
}
