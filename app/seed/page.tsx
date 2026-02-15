'use client';

import { useState } from 'react';
import { supabase } from '@/lib/supabase';

export interface Route {
  id: string;
  slug: string;
  name: string;
  description: string;
  distance: number;
  originLat: number;
  originLng: number;
  destLat: number;
  destLng: number;
}

export interface Waypoint {
  lat: number;
  lng: number;
}

export default function SeedPage() {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState('');

  const handleSeed = async () => {
    setLoading(true);
    setResult('');

    try {
      const sampleRoutes: Omit<Route, 'id'>[] = [
        {
          slug: 'hudson-river',
          name: 'Hudson River',
          description: 'A scenic run along the Hudson River with stunning waterfront views',
          distance: 5.2,
          originLat: 40.7128,
          originLng: -74.0133,
          destLat: 40.7282,
          destLng: -74.0077,
        },
        {
          slug: 'midtown-east',
          name: 'Midtown East',
          description: 'Urban route through the heart of Midtown Manhattan',
          distance: 3.8,
          originLat: 40.7505,
          originLng: -73.9776,
          destLat: 40.7614,
          destLng: -73.9696,
        },
        {
          slug: 'central-park',
          name: 'Central Park',
          description: 'Iconic loop around the famous Central Park',
          distance: 6.1,
          originLat: 40.7829,
          originLng: -73.9654,
          destLat: 40.8008,
          destLng: -73.9493,
        },
      ];

      const routesWithWaypoints = [
        {
          route: 'hudson-river',
          waypoints: [
            { lat: 40.7128, lng: -74.0133 },
            { lat: 40.7256, lng: -74.0155 },
            { lat: 40.7282, lng: -74.0077 },
          ],
        },
        {
          route: 'midtown-east',
          waypoints: [
            { lat: 40.7505, lng: -73.9776 },
            { lat: 40.7559, lng: -73.9689 },
            { lat: 40.7614, lng: -73.9696 },
          ],
        },
        {
          route: 'central-park',
          waypoints: [
            { lat: 40.7829, lng: -73.9654 },
            { lat: 40.7918, lng: -73.9576 },
            { lat: 40.8008, lng: -73.9493 },
          ],
        },
      ];

      // Clear existing routes
      const { error: deleteError } = await supabase.from('routes').delete().neq('slug', '___');
      if (deleteError) throw deleteError;

      // Insert sample routes
      const { data: routesData, error: routesError } = await supabase
        .from('routes')
        .insert(sampleRoutes)
        .select();

      if (routesError) throw routesError;

      // Insert waypoints for each route
      for (const routeWp of routesWithWaypoints) {
        const route = routesData.find((r) => r.slug === routeWp.route);
        if (!route) {
          console.error(`Route ${routeWp.route} not found`);
          continue;
        }

        const { error: wpError } = await supabase
          .from('waypoints')
          .insert(
            routeWp.waypoints.map((wp) => ({
              route_id: route.id,
              lat: wp.lat,
              lng: wp.lng,
            })),
          )
          .select();

        if (wpError) throw wpError;
      }

      setResult(`✅ Successfully seeded ${routesData.length} routes!`);
      console.log('Routes seeded:');
      routesData.forEach((route) => {
        console.log(`  - ${route.name} (${route.slug})`);
        console.log(`    ${route.description}`);
      });
    } catch (error: unknown) {
      console.error('Failed to seed routes:', error);
      const message = error instanceof Error ? error.message : 'Unknown error';
      setResult(`❌ Error: ${message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-zinc-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md space-y-6">
        <h1 className="text-3xl font-bold text-zinc-900">Seed Database</h1>
        <p className="text-zinc-600">Click button below to seed sample routes to Supabase.</p>
        <button
          onClick={handleSeed}
          disabled={loading}
          className="w-full px-4 py-2 bg-teal-600 text-white rounded-md hover:bg-teal-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Seeding...' : 'Seed Routes'}
        </button>
        {result && (
          <div
            className={`p-4 rounded-md ${result.startsWith('✅') ? 'bg-green-50 text-green-800' : 'bg-red-50 text-red-800'}`}
          >
            <pre className="whitespace-pre-wrap text-sm">{result}</pre>
          </div>
        )}
      </div>
    </main>
  );
}
