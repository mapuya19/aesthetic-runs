-- Insert sample routes from CSV
INSERT INTO routes (id, slug, name, description, distance, originLat, originLng, destLat, destLng, image_url, created_at, updated_at) VALUES
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 'midtown-east', 'Midtown East Architecture Run', 'A 2-mile architectural tour of Midtown East, featuring Grand Central Terminal, St. Patrick Cathedral, MoMA, Radio City Music Hall, and Chrysler Building.', 2, 40.753294, -73.977161, 40.752094, -73.975402, 'https://images.unsplash.com/photo-1496442226666-8d4a0e62e6e9?w=800&h=600&fit=crop', '2026-02-14 15:29:38.025', '2026-02-14 15:29:38.025'),
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 'empire-state', 'Empire State Run', 'A 2-mile run featuring iconic New York landmarks including Empire State Building and the Flatiron District.', 2, 40.738164, -73.978216, 40.742213, -73.989588, 'https://i.imgur.com/Zu2TSlp.png', '2026-02-14 15:29:38.105', '2026-02-14 15:29:38.105'),
('5dd84119-6615-457f-a051-1e613a534f8e', 'statue-of-liberty', 'Statue of Liberty View Run', 'A 5-mile run from Washington Square Park through Hudson River Park to the Battery, featuring views of the Statue of Liberty.', 5, 40.730827, -73.997214, 40.731319, -73.995094, 'https://i.imgur.com/pymiY7E.png', '2026-02-14 15:29:38.263', '2026-02-14 15:29:38.263'),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'central-park', 'Central Park Run', 'A scenic 5-mile run through the iconic Central Park, featuring landmarks like Bethesda Fountain and the Reservoir.', 5, 40.79939, -73.952404, 40.769055, -73.981686, 'https://images.unsplash.com/photo-1568515387631-8b650bbcdb90?w=800&h=600&fit=crop', '2026-02-14 15:29:38.263', '2026-02-14 15:29:38.263'),
('bc801c26-6e3e-4056-a725-b60a1a873180', 'hudson-river', 'Hudson River Run', 'A pleasant 1-mile run along the Hudson River waterfront from Hudson Yards to Little Island.', 1, 40.754459, -74.002129, 40.742104, -74.010025, 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop', '2026-02-14 15:29:37.946', '2026-02-14 15:29:37.946'),
('f26e7e4f-e273-45a9-8448-6fc2932e8642', 'lincoln-center', 'Lincoln Center Run', 'A cultural 1-mile run starting from Columbus Circle, featuring Lincoln Center and Strawberry Fields in Central Park.', 1, 40.768411, -73.981885, 40.775967, -73.97474, 'https://i.imgur.com/pQnM9hn.png', '2026-02-14 15:29:38.182', '2026-02-14 15:29:38.182');

-- Insert waypoints for Midtown East
INSERT INTO waypoints (route_id, lat, lng) VALUES
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 40.759523, -73.976239),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 40.762339, -73.977354),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 40.761248, -73.980097),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 40.753749, -73.978702);

-- Insert waypoints for Empire State Run
INSERT INTO waypoints (route_id, lat, lng) VALUES
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 40.749226, -73.981397),
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 40.748817, -73.985428),
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 40.7466, -73.994193);

-- Insert waypoints for Statue of Liberty View Run
INSERT INTO waypoints (route_id, lat, lng) VALUES
('5dd84119-6615-457f-a051-1e613a534f8e', 40.721321, -74.013074),
('5dd84119-6615-457f-a051-1e613a534f8e', 40.70124, -74.015272),
('5dd84119-6615-457f-a051-1e613a534f8e', 40.703118, -74.015339);

-- Insert waypoints for Central Park Run
INSERT INTO waypoints (route_id, lat, lng) VALUES
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.79765, -73.956022),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.79508, -73.959318),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.787578, -73.962631),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.781274, -73.962803),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.783029, -73.974219),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.775945, -73.970957),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.771785, -73.974819),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 40.76873, -73.974476);

-- Insert waypoints for Hudson River Run
INSERT INTO waypoints (route_id, lat, lng) VALUES
('bc801c26-6e3e-4056-a725-b60a1a873180', 40.748997, -74.008566);

-- Insert waypoints for Lincoln Center Run
INSERT INTO waypoints (route_id, lat, lng) VALUES
('f26e7e4f-e273-45a9-8448-6fc2932e8642', 40.772692, -73.983425);

-- Insert steps for Midtown East
INSERT INTO steps (route_id, label, description, order_num) VALUES
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 'Start at Grand Central Terminal', 'Begin your run at the iconic Grand Central Terminal, one of the world''s most beautiful train stations.', 1),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 'Visit St. Patrick''s Cathedral', 'Run past the stunning Gothic Revival cathedral on Fifth Avenue.', 2),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 'Pass by MoMA', 'See the Museum of Modern Art, home to some of the world''s finest modern art.', 3),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 'Radio City Music Hall', 'Admire the Art Deco masterpiece and home of the Rockettes.', 4),
('41e47512-b7e9-45d4-80b7-6b08140e5f75', 'Finish at Chrysler Building', 'End your run at the beautiful Chrysler Building, a symbol of New York City.', 5);

-- Insert steps for Empire State Run
INSERT INTO steps (route_id, label, description, order_num) VALUES
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 'Start at Empire State Building', 'Begin at the base of the world-famous Empire State Building.', 1),
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 'Madison Square Park', 'Run through this lovely urban park with great city views.', 2),
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 'Flatiron Building', 'Pass by the iconic triangular Flatiron Building.', 3),
('571fbb3e-6b4d-492b-a51f-1cf8cb3c8d97', 'Finish at Union Square', 'End at bustling Union Square Park.', 4);

-- Insert steps for Statue of Liberty View Run
INSERT INTO steps (route_id, label, description, order_num) VALUES
('5dd84119-6615-457f-a051-1e613a534f8e', 'Start at Washington Square Park', 'Begin at the iconic Washington Square Arch.', 1),
('5dd84119-6615-457f-a051-1e613a534f8e', 'Hudson River Greenway', 'Run north along the beautiful Hudson River waterfront.', 2),
('5dd84119-6615-457f-a051-1e613a534f8e', 'Chelsea Piers', 'Pass by the recreational complex on the Hudson.', 3),
('5dd84119-6615-457f-a051-1e613a534f8e', 'Battery Park', 'Arrive at the southern tip of Manhattan with views of the Statue of Liberty.', 4),
('5dd84119-6615-457f-a051-1e613a534f8e', 'Finish at Battery Park', 'Enjoy the Statue of Liberty views and complete your run.', 5);

-- Insert steps for Central Park Run
INSERT INTO steps (route_id, label, description, order_num) VALUES
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'Start at North End', 'Begin near the Harlem Meer at the north end of the park.', 1),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'Harlem Meer', 'Run past the beautiful lake at the park''s north end.', 2),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'The Pool', 'Pass by the tranquil Pool area.', 3),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'Great Lawn', 'Run along the edge of the massive Great Lawn.', 4),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'Bethesda Terrace', 'See the iconic Bethesda Terrace and Fountain.', 5),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'The Mall', 'Run down the beautiful tree-lined Mall.', 6),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'Sheep Meadow', 'Pass by the famous Sheep Meadow.', 7),
('a10f081e-01cb-4761-b305-4ee2d5c0ae8a', 'Finish at Columbus Circle', 'End your run at the southwest corner of Central Park.', 8);

-- Insert steps for Hudson River Run
INSERT INTO steps (route_id, label, description, order_num) VALUES
('bc801c26-6e3e-4056-a725-b60a1a873180', 'Start at Hudson Yards', 'Begin at the modern Hudson Yards development.', 1),
('bc801c26-6e3e-4056-a725-b60a1a873180', 'Hudson River Park', 'Run along the waterfront path.', 2),
('bc801c26-6e3e-4056-a725-b60a1a873180', 'Little Island', 'Finish at the unique Little Island park structure.', 3);

-- Insert steps for Lincoln Center Run
INSERT INTO steps (route_id, label, description, order_num) VALUES
('f26e7e4f-e273-45a9-8448-6fc2932e8642', 'Start at Columbus Circle', 'Begin at the busy Columbus Circle intersection.', 1),
('f26e7e4f-e273-45a9-8448-6fc2932e8642', 'Lincoln Center', 'Run past the world-famous performing arts center.', 2),
('f26e7e4f-e273-45a9-8448-6fc2932e8642', 'Strawberry Fields', 'Enter Central Park and visit the memorial to John Lennon.', 3),
('f26e7e4f-e273-45a9-8448-6fc2932e8642', 'Finish at Central Park', 'Complete your run with views of the park.', 4);
