'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import { routesApi } from '@/lib/routes';
import type { Route } from '@/types';

export default function Home() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);

  useEffect(() => {
    const fetchRoutes = async () => {
      try {
        const { data } = await routesApi.getAll();
        setRoutes(data.routes);
      } catch (error) {
        console.error('Failed to load routes:', error);
      }
    };
    fetchRoutes();
  }, []);

  const handleLogout = async () => {
    await logout();
    router.push('/');
  };

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-50">
        <nav className="bg-white shadow-sm border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-teal-600">Aesthetic Runs</h1>
              <div className="flex items-center gap-4">
                <span className="text-zinc-700">{user?.email}</span>
                <Button variant="outline" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-zinc-900 mb-4">Run in style.</h2>
            <p className="text-xl text-zinc-600">
              Have your runs be a little more pleasing to the eye.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div key={route.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-48">
                  <div className="w-full h-full bg-gradient-to-br from-teal-500 to-emerald-600 flex items-center justify-center text-white text-4xl font-bold">
                    {route.name[0]}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-2">{route.name}</h3>
                  <p className="text-zinc-600 mb-4">{route.description}</p>
                  <Link href={`/map/${route.slug}`}>
                    <Button className="w-full">Run route!</Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </ProtectedRoute>
  );
}
