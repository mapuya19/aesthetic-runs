'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import MapView from '@/components/MapView';
import RouteStepper from '@/components/RouteStepper';
import { routesApi } from '@/lib/routes';
import { toast } from 'sonner';
import type { Route } from '@/types';

export default function Map({ params }: { params: Promise<{ route: string }> }) {
  const { route: routeSlug } = use(params);
  const router = useRouter();
  const [route, setRoute] = useState<Route | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRoute = async () => {
      try {
        const response = await routesApi.getBySlug(routeSlug);
        setRoute(response.data.route);
      } catch (error: unknown) {
        const err = error as { response?: { data?: { message?: string } } };
        toast.error(err.response?.data?.message || 'Failed to load route');
      } finally {
        setLoading(false);
      }
    };

    fetchRoute();
  }, [routeSlug]);

  if (loading) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
            <p className="text-zinc-600">Loading route...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!route) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-zinc-50 flex items-center justify-center">
          <p className="text-zinc-600">Route not found</p>
        </div>
      </ProtectedRoute>
    );
  }

  const handleRouteComplete = () => {
    toast.success('Route completed! Great job!');
    // Use Next.js router for client-side navigation (preserves auth state)
    router.push('/home');
  };

  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        <div className="flex-1 h-screen">
          <MapView route={route} />
        </div>
        <div className="w-96 h-screen bg-white shadow-xl">
          <RouteStepper
            steps={route.steps || []}
            distance={route.distance}
            onComplete={handleRouteComplete}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
