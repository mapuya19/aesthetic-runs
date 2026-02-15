import { supabase } from './supabase';
import type { Route } from '@/types';

const transformRoute = (r: Record<string, unknown>): Route => ({
  id: r.id as string,
  name: r.name as string,
  slug: r.slug as string,
  description: r.description as string | null,
  distance: r.distance as number,
  originLat: (r.origin_lat ?? r.originlat ?? r.originLat) as number,
  originLng: (r.origin_lng ?? r.originlng ?? r.originLng) as number,
  destLat: (r.dest_lat ?? r.destlat ?? r.destLat) as number,
  destLng: (r.dest_lng ?? r.destlng ?? r.destLng) as number,
  imageUrl: (r.image_url ?? r.imageUrl) as string | undefined,
  waypoints: ((r.waypoints as Record<string, unknown>[]) || []).map((wp) => ({
    lat: wp.lat as number,
    lng: wp.lng as number,
  })),
  steps: ((r.steps as Record<string, unknown>[]) || [])
    .sort((a, b) => (a.order_num as number) - (b.order_num as number))
    .map((s) => ({
      label: s.label as string,
      description: (s.description as string | null) || undefined,
    })),
  createdAt: r.created_at as string,
  updatedAt: r.updated_at as string,
});

export const routesApi = {
  getAll: async (): Promise<{ data: { routes: Route[] } }> => {
    const { data, error } = await supabase.from('routes').select('*, waypoints(*), steps(*)').order('name');

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
      .select('*, waypoints(*), steps(*)')
      .eq('slug', slug)
      .single();

    if (error) throw error;

    return { data: { route: transformRoute(data) } };
  },
};
