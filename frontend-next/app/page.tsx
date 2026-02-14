'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function Landing() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center justify-center bg-cover bg-center relative"
      style={{
        backgroundImage: 'url("https://wallpaperaccess.com/full/123346.jpg")',
      }}
    >
      <div className="absolute inset-0 bg-black/40" />
      <div className="relative z-10 text-center space-y-8">
        <h1 className="text-6xl font-bold text-white drop-shadow-lg">
          AESTHETIC RUNS
        </h1>
        <div className="flex gap-4 justify-center">
          <Link href="/register">
            <Button size="lg" className="bg-teal-600 hover:bg-teal-700">
              Sign up
            </Button>
          </Link>
          <Link href="/login">
            <Button size="lg" variant="secondary">
              Login
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
