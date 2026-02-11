# Supabase Setup Guide

The product storage has been migrated from local file system to Supabase PostgreSQL database.

## Prerequisites

1. A Supabase account (sign up at https://supabase.com)
2. A Supabase project created

## Setup Steps

### 1. Get Supabase Credentials

1. Go to your Supabase project dashboard
2. Navigate to **Settings** → **API**
3. Copy the following values:
   - **Project URL** (looks like: `https://xxxxx.supabase.co`)
   - **Anon/Public Key** (looks like: `eyJhbGciOi...`)

### 2. Update Environment Variables

Add these to your `.env` file:

```bash
SUPABASE_URL=your_project_url_here
SUPABASE_ANON_KEY=your_anon_key_here
```

### 3. Create Database Table

1. Go to your Supabase project dashboard
2. Navigate to **SQL Editor**
3. Copy the contents of `supabase-schema.sql`
4. Paste and run the SQL script

This will create:
- `products` table with the correct schema
- Indexes for performance
- Row Level Security (RLS) policies

### 4. Migrate Existing Data (Optional)

If you have existing products in `data/products.json`, you can:

1. **Option A - Via API:** Use the POST endpoint to add products
   ```bash
   curl -X POST http://localhost:3001/api/ucp/products \
     -H "Content-Type: application/json" \
     -d @data/products.json
   ```

2. **Option B - Direct SQL:** Uncomment and modify the INSERT statements in `supabase-schema.sql`

### 5. Start the Server

```bash
npm run dev
```

The service will now use Supabase for all product storage operations.

## Table Schema

```sql
products (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  description TEXT NOT NULL,
  price JSONB NOT NULL,              -- {"value": 1500, "currency": "USD"}
  availability TEXT NOT NULL,        -- in_stock | out_of_stock | preorder | backorder
  link TEXT NOT NULL,
  image_link TEXT NOT NULL,
  brand TEXT,
  gtin TEXT,
  mpn TEXT,
  condition TEXT,                    -- new | refurbished | used
  category TEXT,
  created_at TIMESTAMP,
  updated_at TIMESTAMP
)
```

## Security Notes

- The default RLS policies allow:
  - **Public read access** (anyone can view products)
  - **Authenticated write access** (insert/update/delete require auth)
- Adjust the policies in `supabase-schema.sql` based on your security requirements
- For public APIs, you may want to allow unauthenticated writes or implement API key authentication

## Troubleshooting

**Error: "Supabase URL and Anon Key must be provided"**
- Make sure `SUPABASE_URL` and `SUPABASE_ANON_KEY` are set in your `.env` file

**Error: "relation 'products' does not exist"**
- Run the SQL schema script in your Supabase SQL Editor

**Products not returning data**
- Check RLS policies - you may need to adjust them
- Verify data exists: Go to Supabase → Table Editor → products

## API Behavior

All API endpoints remain the same:
- `POST /api/ucp/products` - Add/upsert products
- `GET /api/ucp/products` - Get all products
- `GET /api/ucp/products/:id` - Get single product
- `PUT /api/ucp/products/:id` - Update product
- `DELETE /api/ucp/products/:id` - Delete product

The only change is where the data is stored (Supabase instead of local file).
