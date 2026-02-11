import { createClient } from '@supabase/supabase-js';
import { config } from './index';

if (!config.supabase.url || !config.supabase.anonKey) {
  throw new Error('Supabase URL and Anon Key must be provided in environment variables');
}

export const supabase = createClient(config.supabase.url, config.supabase.anonKey);
