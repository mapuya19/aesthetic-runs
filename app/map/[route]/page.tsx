'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
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
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-3 border-[var(--brand)] border-t-transparent mx-auto mb-4" />
            <p className="text-[var(--text-secondary)]">Loading route...</p>
          </div>
        </div>
      </ProtectedRoute>
    );
  }

  if (!route) {
    return (
      <ProtectedRoute>
        <div className="min-h-screen bg-[var(--background)] flex items-center justify-center">
          <p className="text-[var(--text-secondary)]">Route not found</p>
        </div>
      </ProtectedRoute>
    );
  }

  const handleRouteComplete = () => {
    toast.success('Route completed! Great job!');
    router.push('/home');
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col lg:flex-row h-screen">
        <div className="flex-1 h-64 lg:h-screen">
          <MapView route={route} />
        </div>
        <div className="flex-1 lg:w-96 lg:h-[calc(100vh-4rem)] bg-[var(--background)] border-t lg:border-t-0 lg:border-l border-[var(--border-soft)] shadow-xl lg:shadow-none flex flex-col">
          <div className="flex-shrink-0 bg-[var(--background)] border-b border-[var(--border-soft)] p-4 z-10">
            <div className="flex items-center justify-between">
              <Link
                href="/home"
                className="inline-flex items-center gap-2 text-[var(--text-secondary)] hover:text-[var(--foreground)] transition-colors"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Back
              </Link>
              <div className="text-right">
                <h1 className="text-xl font-bold text-[var(--foreground)]">{route.name}</h1>
                <p className="text-sm text-[var(--text-secondary)]">{route.distance} miles</p>
              </div>
            </div>
          </div>
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
