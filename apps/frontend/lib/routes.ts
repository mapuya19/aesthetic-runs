import { supabase } from './supabase';
import type { Route, Waypoint, Step } from '@/types';

export const routesApi = {
  getAll: async (): Promise<{ data: { routes: Route[] } }> => {
    const { data, error } = await supabase.from('routes').select('*, waypoints(*)').order('name');

    if (error) throw error;
    return {
      data: {
        routes: (data || []).map((r) => ({
          ...r,
          waypoints: r.waypoints || [],
        })) as Route[],
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

    return { data: { route: data as Route } };
  },
};
