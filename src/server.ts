import app from './app';
import { config } from './config';

const startServer = (): void => {
  try {
    app.listen(config.port, () => {
      console.log(`🚀 UCP Product Feed Service started`);
      console.log(`📦 Environment: ${config.nodeEnv}`);
      console.log(`🌐 Server listening on port ${config.port}`);
      console.log(`🏪 Merchant ID: ${config.merchantId || 'Not configured'}`);
      console.log(`\nEndpoints:`);
      console.log(`  - Health: http://localhost:${config.port}/health`);
      console.log(`  - UCP Profile: http://localhost:${config.port}/ucp/profile`);
      console.log(`  - Product Feed: http://localhost:${config.port}/api/ucp/products`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
};

startServer();
