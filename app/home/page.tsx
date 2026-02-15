'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';
import Footer from '@/components/Footer';
import { routesApi } from '@/lib/routes';
import type { Route } from '@/types';

export default function Home() {
  const { user, logout } = useAuthStore();
  const router = useRouter();
  const [routes, setRoutes] = useState<Route[]>([]);
  const [hoveredRoute, setHoveredRoute] = useState<string | null>(null);

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
      <div className="min-h-screen bg-[var(--background)]">
        <nav className="bg-[var(--background)] border-b border-[var(--border-soft)]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-[var(--brand)]">Aesthetic Runs</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-[var(--text-secondary)] hidden sm:inline-block">{user?.email}</span>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </nav>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center mb-12">
            <h2 className="text-5xl font-bold text-[var(--foreground)] mb-4 tracking-tight">
              Run in style
            </h2>
            <p className="text-xl text-[var(--text-secondary)] max-w-2xl mx-auto">
              Discover routes that turn your run into an adventure. Every path has a story.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {routes.map((route) => (
              <div
                key={route.id}
                className="group bg-[var(--background)] rounded-2xl shadow-card overflow-hidden hover:shadow-elevated transition-all duration-300 hover:-translate-y-1"
                onMouseEnter={() => setHoveredRoute(route.id)}
                onMouseLeave={() => setHoveredRoute(null)}
              >
                <div className="relative w-full h-56 overflow-hidden">
                  {route.imageUrl ? (
                    <Image
                      src={route.imageUrl}
                      alt={route.name}
                      fill
                      quality={80}
                      className="object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-gradient-to-br from-[var(--navy)] via-[var(--purple)] to-[var(--brand)] flex items-center justify-center text-white text-4xl font-bold">
                      {route.name[0]}
                    </div>
                  )}
                  <div className="absolute top-4 right-4 bg-[var(--background)]/90 backdrop-blur-sm rounded-full px-4 py-2 shadow-subtle">
                    <span className="text-sm font-semibold text-[var(--brand)]">
                      {route.distance} mi
                    </span>
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-[var(--foreground)] mb-2 group-hover:text-[var(--brand)] transition-colors">
                    {route.name}
                  </h3>
                  <p className="text-[var(--text-secondary)] mb-6 line-clamp-2">{route.description}</p>
                  <Link href={`/map/${route.slug}`}>
                    <Button 
                      className="w-full"
                      variant={hoveredRoute === route.id ? 'default' : 'secondary'}
                    >
                      Run Route
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </main>

        <Footer />
      </div>
    </ProtectedRoute>
  );
}
