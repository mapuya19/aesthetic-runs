'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import Link from 'next/link';
import Image from 'next/image';
import { useAuthStore } from '@/store/authStore';
import { Button } from '@/components/ui/button';

export default function Home() {
  const { user, logout } = useAuthStore();

  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-50">
        <nav className="bg-white shadow-sm border-b border-zinc-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between h-16 items-center">
              <h1 className="text-2xl font-bold text-teal-600">Aesthetic Runs</h1>
              <div className="flex items-center gap-4">
                <span className="text-zinc-700">{user?.email}</span>
                <Button variant="outline" size="sm" onClick={logout}>
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
            {[
              {
                name: 'Hudson River',
                image: 'https://i.imgur.com/UuBLN4A.png',
              },
              {
                name: 'Midtown East',
                image: 'https://i.imgur.com/wrCBULb.png',
              },
              {
                name: 'Central Park',
                image: 'https://i.imgur.com/8xk3z1v.png',
              },
            ].map((route) => (
              <div key={route.name} className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="relative w-full h-48">
                  <Image src={route.image} alt={route.name} fill className="object-cover" />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-4">{route.name}</h3>
                  <Link href={`/map/${route.name.toLowerCase().replace(' ', '-')}`}>
                    <Button className="w-full">Run the route!</Button>
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

function Link({
  href,
  children,
  className,
}: {
  href: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <a href={href} className={className}>
      {children}
    </a>
  );
}
