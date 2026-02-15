-- Enable Row Level Security
ALTER TABLE routes ENABLE ROW LEVEL SECURITY;
ALTER TABLE waypoints ENABLE ROW LEVEL SECURITY;

-- Allow public read access
CREATE POLICY "Public routes are viewable by everyone" ON routes FOR SELECT USING (true);
CREATE POLICY "Public waypoints are viewable by everyone" ON waypoints FOR SELECT USING (true);

-- Allow public insert (for seeding)
CREATE POLICY "Anyone can create routes" ON routes FOR INSERT WITH CHECK (true);
CREATE POLICY "Anyone can create waypoints" ON waypoints FOR INSERT WITH CHECK (true);
