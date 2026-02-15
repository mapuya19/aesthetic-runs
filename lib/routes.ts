import { supabase } from './supabase';
import type { Route } from '@/types';

const transformRoute = (r: Record<string, unknown>): Route => ({
  id: r.id as string,
  name: r.name as string,
  slug: r.slug as string,
  description: r.description as string | null,
  distance: r.distance as number,
  originLat: (r.origin_lat ?? r.originLat) as number,
  originLng: (r.origin_lng ?? r.originLng) as number,
  destLat: (r.dest_lat ?? r.destLat) as number,
  destLng: (r.dest_lng ?? r.destLng) as number,
  waypoints: ((r.waypoints as Record<string, unknown>[]) || []).map((wp) => ({
    lat: wp.lat as number,
    lng: wp.lng as number,
  })),
  steps: [],
  createdAt: r.created_at as string,
  updatedAt: r.updated_at as string,
});

export const routesApi = {
  getAll: async (): Promise<{ data: { routes: Route[] } }> => {
    const { data, error } = await supabase.from('routes').select('*, waypoints(*)').order('name');

    if (error) throw error;
    return {
      data: {
        routes: (data || []).map(transformRoute),
      },
    };
  },

  getBySlug: async (slug: string): Promise<{ data: { route: Route } }> => {
    const { data, error } = await supabase
      .from('routes')
      .select('*, waypoints(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    console.log('Raw Supabase data:', data);
    const transformed = transformRoute(data);
    console.log('Transformed route:', transformed);

    return { data: { route: transformed } };
  },
};
