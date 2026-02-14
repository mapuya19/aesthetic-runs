-- Create routes table
CREATE TABLE IF NOT EXISTS routes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  distance NUMERIC NOT NULL,
  origin_lat NUMERIC NOT NULL,
  origin_lng NUMERIC NOT NULL,
  dest_lat NUMERIC NOT NULL,
  dest_lng NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create waypoints table
CREATE TABLE IF NOT EXISTS waypoints (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  route_id UUID REFERENCES routes(id) ON DELETE CASCADE NOT NULL,
  lat NUMERIC NOT NULL,
  lng NUMERIC NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create index on routes.slug for faster lookups
CREATE INDEX IF NOT EXISTS routes_slug_idx ON routes(slug);

-- Enable Row Level Security
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE waypoints ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public routes are viewable by everyone" ON routes FOR SELECT USING (true);

CREATE POLICY "Public waypoints are viewable by everyone" ON waypoints FOR SELECT USING (true);

-- Only allow inserts (you can add authentication later if needed)
CREATE POLICY "Anyone can create routes" ON routes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create waypoints" ON waypoints FOR INSERT WITH CHECK (true);
