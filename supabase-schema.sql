-- Create products table in Supabase
-- Run this SQL in your Supabase SQL Editor

CREATE TABLE IF NOT EXISTS products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price JSONB NOT NULL,
  availability TEXT NOT NULL CHECK (availability IN ('in_stock', 'out_of_stock', 'preorder', 'backorder')),
  link TEXT NOT NULL,
  image_link TEXT NOT NULL,
  brand TEXT,
  gtin TEXT,
  mpn TEXT,
  condition TEXT CHECK (condition IN ('new', 'refurbished', 'used')),
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- Create index on id for faster lookups
CREATE INDEX IF NOT EXISTS idx_products_id ON products(id);

-- Create index on availability for filtering
CREATE INDEX IF NOT EXISTS idx_products_availability ON products(availability);

-- Enable Row Level Security (RLS)
ALTER TABLE products ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON products
  FOR SELECT
  USING (true);

-- Create policy to allow authenticated users to insert/update/delete
-- Adjust this based on your security requirements
CREATE POLICY "Allow authenticated users to insert" ON products
  FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow authenticated users to update" ON products
  FOR UPDATE
  USING (true);

CREATE POLICY "Allow authenticated users to delete" ON products
  FOR DELETE
  USING (true);

-- Optional: Insert sample data from your existing products
-- Uncomment and modify as needed
/*
INSERT INTO products (id, title, description, price, availability, link, image_link, brand, category, condition)
VALUES
  (
    'pony-001',
    'Miniature Pony - Butterscotch',
    'Adorable miniature pony, perfect for children and small spaces. Gentle temperament, well-trained. Height: 34 inches',
    '{"value": 1500, "currency": "USD"}'::jsonb,
    'in_stock',
    'placeholder',
    'placeholder',
    'Premium Ponies',
    'Livestock > Equine > Miniature',
    'new'
  ),
  (
    'pony-002',
    'Shetland Pony - Thunder',
    'Hardy Shetland pony with excellent temperament. Great for children and light riding. Height: 42 inches, 5 years old',
    '{"value": 2800, "currency": "USD"}'::jsonb,
    'in_stock',
    'placeholder',
    'placeholder',
    'Highland Stables',
    'Livestock > Equine > Shetland',
    'new'
  );
*/
