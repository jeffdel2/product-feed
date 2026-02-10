import express, { Application } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import path from 'path';
import { config } from './config';
import productFeedRoutes from './routes/productFeed.routes';
import { errorHandler, notFoundHandler } from './middleware/errorHandler';
import { requestLogger } from './middleware/logger';

const app: Application = express();

// Security middleware
app.use(helmet());
app.use(cors());

// Body parsing middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Static file serving
app.use('/images', express.static(path.join(__dirname, '../public/images')));
app.use(express.static(path.join(__dirname, '../public')));

// Request logging
app.use(requestLogger);

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    merchantId: config.merchantId,
  });
});

// UCP Profile endpoint (for discovery)
app.get('/ucp/profile', (req, res) => {
  res.json({
    merchantId: config.merchantId,
    name: 'Product Feed Service',
    capabilities: ['product_feed', 'inventory_management'],
    endpoints: {
      productFeed: '/api/ucp/products',
      health: '/health',
    },
  });
});

// API routes
app.use('/api/ucp', productFeedRoutes);

// Error handling
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
