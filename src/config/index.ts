import dotenv from 'dotenv';

dotenv.config();

export const config = {
  port: process.env.PORT || 3000,
  nodeEnv: process.env.NODE_ENV || 'development',
  merchantId: process.env.MERCHANT_ID || '',
  ucp: {
    publicKeyPath: process.env.UCP_PUBLIC_KEY_PATH || './keys/public.pem',
    privateKeyPath: process.env.UCP_PRIVATE_KEY_PATH || './keys/private.pem',
  },
  supabase: {
    url: process.env.SUPABASE_URL || '',
    anonKey: process.env.SUPABASE_ANON_KEY || '',
  },
};
