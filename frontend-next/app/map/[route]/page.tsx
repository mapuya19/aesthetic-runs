'use client';

import ProtectedRoute from '@/components/ProtectedRoute';
import { useEffect, useState } from 'react';

export default function Map({ params }: { params: { route: string } }) {
  return (
    <ProtectedRoute>
      <div className="min-h-screen bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <h1 className="text-3xl font-bold text-zinc-900 mb-6">
            {params.route.replace(/-/g, ' ').toUpperCase()} ROUTE
          </h1>
          <div className="bg-white rounded-lg shadow-md p-6">
            <p className="text-zinc-600 mb-4">
              Map will be displayed here using react-map-gl (Mapbox).
            </p>
            <div className="h-96 bg-zinc-200 rounded-lg flex items-center justify-center">
              <p className="text-zinc-500">Map component placeholder</p>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
