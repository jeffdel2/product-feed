# UCP Product Feed Service

A Node.js web service implementing the Google Universal Commerce Protocol (UCP) for product feed management.

## Features

- RESTful API for product feed management
- TypeScript for type safety
- Express.js web framework
- Product validation and error handling
- Health check and UCP profile endpoints
- CORS and security headers (Helmet)
- Request logging middleware

## Project Structure

```
product-feed/
├── src/
│   ├── config/           # Configuration files
│   ├── controllers/      # Request handlers
│   ├── middleware/       # Express middleware
│   ├── routes/          # API route definitions
│   ├── services/        # Business logic
│   ├── types/           # TypeScript type definitions
│   ├── app.ts           # Express app setup
│   └── server.ts        # Server entry point
├── .env.example         # Environment variables template
├── tsconfig.json        # TypeScript configuration
└── package.json         # Project dependencies
```

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Create environment file:
   ```bash
   cp .env.example .env
   ```

3. Configure your `.env` file:
   ```
   PORT=3000
   NODE_ENV=development
   MERCHANT_ID=your_merchant_id
   ```

## Running the Service

### Development Mode
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

## API Endpoints

### Health Check
```
GET /health
```

### UCP Profile
```
GET /ucp/profile
```
Returns merchant capabilities and available endpoints.

### Product Feed Management

#### Add Products
```
POST /api/ucp/products
Content-Type: application/json

{
  "products": [
    {
      "id": "prod-123",
      "title": "Product Name",
      "description": "Product description",
      "price": {
        "value": 29.99,
        "currency": "USD"
      },
      "availability": "in_stock",
      "imageUrl": "https://example.com/image.jpg",
      "brand": "Brand Name",
      "category": "Category Name"
    }
  ]
}
```

#### Get All Products
```
GET /api/ucp/products
```

#### Get Single Product
```
GET /api/ucp/products/:productId
```

#### Update Product
```
PUT /api/ucp/products/:productId
Content-Type: application/json

{
  "title": "Updated Product Name",
  "price": {
    "value": 39.99,
    "currency": "USD"
  }
}
```

#### Delete Product
```
DELETE /api/ucp/products/:productId
```

## Product Schema

Required fields:
- `id` (string): Unique product identifier
- `title` (string): Product name
- `description` (string): Product description
- `price.value` (number): Price amount
- `price.currency` (string): Currency code (e.g., "USD")
- `availability` (string): One of "in_stock", "out_of_stock", "preorder", "backorder"

Optional fields:
- `imageUrl` (string): Product image URL
- `brand` (string): Brand name
- `gtin` (string): Global Trade Item Number
- `mpn` (string): Manufacturer Part Number
- `condition` (string): One of "new", "refurbished", "used"
- `category` (string): Product category
- `link` (string): Product page URL

## Development

The service uses:
- TypeScript for type checking
- Nodemon for auto-reload during development
- In-memory storage (Map) for products (suitable for development/testing)

## Next Steps

To integrate with Google UCP:
1. Implement authentication/signature verification
2. Add order management endpoints (sessions, checkout)
3. Integrate with actual product database
4. Add webhook support for order updates
5. Configure Google Merchant Center
6. Set up Google Pay integration
7. Publish UCP profile to Google

## License

ISC
