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
      <div className="flex flex-col lg:flex-row h-screen relative">
        <div className="fixed inset-0 lg:relative z-0 lg:z-auto lg:flex-1">
          <MapView route={route} />
          <div className="absolute top-4 left-4 z-10 lg:hidden">
            <Link
              href="/home"
              className="inline-flex items-center justify-center w-10 h-10 bg-[var(--surface-1)]/90 backdrop-blur-sm rounded-full shadow-elevated hover:bg-[var(--surface-2)] active:scale-95 transition-all border border-[var(--border-soft)]"
            >
              <svg className="w-5 h-5 text-[var(--foreground)]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="fixed lg:relative bottom-0 left-0 right-0 lg:top-0 lg:bottom-auto lg:left-auto lg:right-auto lg:flex-1 lg:w-96 lg:h-[calc(100vh-4rem)] bg-[var(--background)] rounded-t-2xl lg:rounded-none shadow-[0_-4px_20px_rgba(0,0,0,0.15)] lg:shadow-none z-10 flex flex-col max-h-[80vh] lg:max-h-full">
          <div className="lg:flex-shrink-0 bg-[var(--background)] border-b border-[var(--border-soft)] p-4 z-10 hidden lg:block">
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
            routeName={route.name}
            onComplete={handleRouteComplete}
          />
        </div>
      </div>
    </ProtectedRoute>
  );
}
