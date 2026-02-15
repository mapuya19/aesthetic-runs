-- Add image_url column to routes table
ALTER TABLE routes ADD COLUMN IF NOT EXISTS image_url TEXT;
