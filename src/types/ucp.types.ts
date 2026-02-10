export interface Product {
  id: string;
  title: string;
  description: string;
  price: {
    value: number;
    currency: string;
  };
  availability: 'in_stock' | 'out_of_stock' | 'preorder' | 'backorder';
  link: string;
  image_link: string;
  brand?: string;
  gtin?: string;
  mpn?: string;
  condition?: 'new' | 'refurbished' | 'used';
  category?: string;
}

export interface ProductFeedRequest {
  merchantId: string;
  products: Product[];
}

export interface ProductFeedResponse {
  success: boolean;
  message: string;
  itemsProcessed?: number;
  errors?: Array<{
    productId: string;
    error: string;
  }>;
}

export interface UCPSession {
  sessionId: string;
  merchantId: string;
  products: Product[];
  createdAt: Date;
  status: 'active' | 'completed' | 'expired';
}

export interface UCPProfile {
  merchantId: string;
  name: string;
  capabilities: string[];
  endpoints: {
    createSession: string;
    updateSession: string;
    completeSession: string;
  };
  publicKey?: string;
}
